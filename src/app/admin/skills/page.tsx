"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Plus,
  Trash2,
  Check,
  Edit2,
  X,
  AlertCircle,
} from "lucide-react";
import { upsertSkill, deleteSkill } from "@/app/admin/actions";
import { SkillItem } from "@/lib/data-service";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const initialFormState: SkillItem = {
    label: "",
    theme: "dark",
    display_order: 1,
  };

  const [formData, setFormData] = useState<SkillItem>(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/skills");
      if (res.ok) {
        const data = await res.json();
        setSkills(data);
      }
    } catch (err) {
      console.error("Error loading skills:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({ ...initialFormState, display_order: skills.length + 1 });
    setError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (skill: SkillItem) => {
    setIsEditing(true);
    setFormData(skill);
    setError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!formData.label.trim()) {
      setError("Skill label is required!");
      setSaving(false);
      return;
    }

    try {
      const res = await upsertSkill(formData);
      if (res && res.success === false) {
        setError(res.error || "Failed to save skill");
        return;
      }
      setSuccessMsg(`Skill tag "${formData.label}" saved!`);
      setTimeout(() => setSuccessMsg(null), 3000);
      setModalOpen(false);
      await fetchSkills();
    } catch (err: any) {
      setError(err.message || "Failed to save skill");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string, label?: string) => {
    if (!id) return;
    if (!window.confirm(`Are you sure you want to remove skill "${label}"?`)) {
      return;
    }

    try {
      const res = await deleteSkill(id);
      if (res && res.success === false) {
        alert(`Delete error: ${res.error}`);
        return;
      }
      await fetchSkills();
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    }
  };

  const getThemeClass = (theme: "white" | "dark" | "accent") => {
    switch (theme) {
      case "white":
        return "bg-white text-slate-900 border-slate-300 shadow-sm";
      case "accent":
        return "bg-blue-600 text-white border-blue-400 shadow-blue-500/20";
      case "dark":
      default:
        return "bg-[#1E293B] text-slate-100 border-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE PHYSICS TAGS</span>
          </div>
          <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">
            Falling Skills Manager
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage the physics falling skills that drop into the Matter.js simulation container.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill Tag</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Skills Pill Board */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 font-mono text-xs">
          Loading skills...
        </div>
      ) : (
        <div className="bg-[#0E1524] border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Active Physics Skill Tags ({skills.length})
            </h3>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-slate-300" />
                <span className="text-slate-400">White</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E293B] border border-slate-600" />
                <span className="text-slate-400">Dark</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border border-blue-400" />
                <span className="text-slate-400">Accent</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill, idx) => (
              <div
                key={skill.id || idx}
                className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border text-xs font-mono font-medium transition-all group ${getThemeClass(
                  skill.theme
                )}`}
              >
                <span>{skill.label}</span>
                <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleOpenEdit(skill)}
                    className="hover:text-blue-400 p-0.5"
                    title="Edit tag"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  {skill.id && (
                    <button
                      onClick={() => handleDelete(skill.id, skill.label)}
                      className="hover:text-red-400 p-0.5"
                      title="Delete tag"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skill Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0D1424] border border-slate-700/80 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-base font-display font-bold text-white">
                {isEditing ? `Edit Skill: ${formData.label}` : "Add Skill Tag"}
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
                  Skill Tag Label *
                </label>
                <input
                  type="text"
                  required
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g. Next.js, Framer Motion, GSAP"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  Visual Theme Color
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["white", "dark", "accent"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData({ ...formData, theme: t })}
                      className={`py-2 px-3 rounded-xl border text-xs font-mono capitalize transition-all ${
                        formData.theme === t
                          ? "border-blue-500 ring-2 ring-blue-500/30 font-bold"
                          : "border-slate-800 opacity-60 hover:opacity-100"
                      } ${getThemeClass(t)}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
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
                  {saving ? "Saving..." : isEditing ? "Update Tag" : "Add Tag"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
