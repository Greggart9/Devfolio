"use client";

import { useState, useEffect } from "react";
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import { upsertFaq, deleteFaq } from "@/app/admin/actions";
import { FaqItem } from "@/lib/data-service";
import { FaqCategory } from "@/lib/data";

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory | "All">("All");

  const categories: FaqCategory[] = ["General", "Pricing", "Process", "Results"];

  const initialFormState: FaqItem = {
    category: "General",
    q: "",
    a: "",
    display_order: 1,
  };

  const [formData, setFormData] = useState<FaqItem>(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/faqs");
      if (res.ok) {
        const data = await res.json();
        setFaqs(data);
      }
    } catch (err) {
      console.error("Error loading faqs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({
      ...initialFormState,
      category: selectedCategory === "All" ? "General" : selectedCategory,
      display_order: faqs.length + 1,
    });
    setError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (faq: FaqItem) => {
    setIsEditing(true);
    setFormData(faq);
    setError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!formData.q.trim() || !formData.a.trim()) {
      setError("Question and Answer are required!");
      setSaving(false);
      return;
    }

    try {
      const res = await upsertFaq(formData);
      if (res && res.success === false) {
        setError(res.error || "Failed to save FAQ");
        return;
      }
      setSuccessMsg("FAQ question saved successfully!");
      setTimeout(() => setSuccessMsg(null), 3000);
      setModalOpen(false);
      await fetchFaqs();
    } catch (err: any) {
      setError(err.message || "Failed to save FAQ");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string, q?: string) => {
    if (!id) return;
    if (!window.confirm(`Are you sure you want to delete this FAQ: "${q}"?`)) {
      return;
    }

    try {
      const res = await deleteFaq(id);
      if (res && res.success === false) {
        alert(`Delete error: ${res.error}`);
        return;
      }
      await fetchFaqs();
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    }
  };

  const filteredFaqs =
    selectedCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>ACCORDION QUESTIONS</span>
          </div>
          <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">
            FAQ Manager
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Add, update, or remove frequently asked questions across categories.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
            selectedCategory === "All"
              ? "bg-blue-600 text-white font-bold"
              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          All ({faqs.length})
        </button>
        {categories.map((cat) => {
          const count = faqs.filter((f) => f.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* FAQs List */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 font-mono text-xs">
          Loading FAQs...
        </div>
      ) : filteredFaqs.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-800 rounded-2xl bg-[#0B111E]/50">
          <HelpCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-xs text-slate-400">No questions found in this category</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => (
            <div
              key={faq.id || idx}
              className="p-5 rounded-2xl bg-[#0E1524] border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono">
                    {faq.category}
                  </span>
                  <h3 className="font-display font-bold text-sm text-white">
                    {faq.q}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-1">
                  {faq.a}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => handleOpenEdit(faq)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  <Edit2 className="w-3 h-3 text-amber-400" />
                  <span>Edit</span>
                </button>
                {faq.id && (
                  <button
                    onClick={() => handleDelete(faq.id, faq.q)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    title="Delete Question"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAQ Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0D1424] border border-slate-700/80 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-base font-display font-bold text-white">
                {isEditing ? "Edit FAQ" : "Add FAQ Question"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as FaqCategory })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={formData.q}
                  onChange={(e) => setFormData({ ...formData, q: e.target.value })}
                  placeholder="e.g. Can we adjust scope midway?"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.a}
                  onChange={(e) => setFormData({ ...formData, a: e.target.value })}
                  placeholder="Clear and transparent answer..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold disabled:opacity-50"
                >
                  {saving ? "Saving..." : isEditing ? "Update Question" : "Add Question"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
