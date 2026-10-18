"use client";

import { useState, useEffect } from "react";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  AlertCircle,
  UploadCloud,
} from "lucide-react";
import CloudinaryUploader from "@/components/admin/CloudinaryUploader";
import { upsertService, deleteService } from "@/app/admin/actions";
import { ServiceItem } from "@/lib/data-service";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const initialFormState: ServiceItem = {
    title: "",
    desc: "",
    icon: "✦",
    image: "",
    tools: ["Next.js", "React", "TypeScript"],
    display_order: 1,
  };

  const [formData, setFormData] = useState<ServiceItem>(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [toolInput, setToolInput] = useState("");

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error("Error loading services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({ ...initialFormState, display_order: services.length + 1 });
    setError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (service: ServiceItem) => {
    setIsEditing(true);
    setFormData(service);
    setError(null);
    setModalOpen(true);
  };

  const handleAddTool = () => {
    if (!toolInput.trim()) return;
    if (!formData.tools.includes(toolInput.trim())) {
      setFormData({ ...formData, tools: [...formData.tools, toolInput.trim()] });
    }
    setToolInput("");
  };

  const handleRemoveTool = (toolToRemove: string) => {
    setFormData({
      ...formData,
      tools: formData.tools.filter((t) => t !== toolToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!formData.title.trim() || !formData.desc.trim() || !formData.image.trim()) {
      setError("Title, description, and image are required!");
      setSaving(false);
      return;
    }

    try {
      const res = await upsertService(formData);
      if (res && res.success === false) {
        setError(res.error || "Failed to save service");
        return;
      }
      setSuccessMsg(`Service "${formData.title}" saved successfully!`);
      setTimeout(() => setSuccessMsg(null), 3000);
      setModalOpen(false);
      await fetchServices();
    } catch (err: any) {
      setError(err.message || "Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string, title?: string) => {
    if (!id) return;
    if (!window.confirm(`Are you sure you want to delete service "${title}"?`)) {
      return;
    }

    try {
      const res = await deleteService(id);
      if (res && res.success === false) {
        alert(`Delete error: ${res.error}`);
        return;
      }
      await fetchServices();
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>CORE CAPABILITIES</span>
          </div>
          <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">
            Services Manager
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage your service offerings, tech tools, descriptions, and visual cover banners.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Services Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 font-mono text-xs">
          Loading services...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => (
            <div
              key={s.id || idx}
              className="bg-[#0E1524] border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm group"
            >
              <div>
                <div className="relative aspect-[16/9] w-full bg-slate-900 border-b border-slate-800 overflow-hidden">
                  {s.image ? (
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-600 text-xs font-mono">
                      No cover image
                    </div>
                  )}
                  <span className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs flex items-center justify-center text-indigo-400">
                    {s.icon || "✦"}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-display font-bold text-base text-white">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {s.desc}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.tools?.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-900/50 border-t border-slate-800/80 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(s)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  <Edit2 className="w-3 h-3 text-indigo-400" />
                  <span>Edit</span>
                </button>
                {s.id && (
                  <button
                    onClick={() => handleDelete(s.id, s.title)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    title="Delete Service"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0D1424] border border-slate-700/80 rounded-2xl w-full max-w-xl flex flex-col shadow-2xl relative my-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <h2 className="text-base font-display font-bold text-white">
                {isEditing ? `Edit Service: ${formData.title}` : "Add New Service"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="mx-5 mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Frontend Development"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Icon Symbol
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="⬡, ◈, ✦"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  Service Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="Clear description of this offering and deliverables..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono text-slate-300 uppercase">
                    Cover Banner Image *
                  </label>
                  <CloudinaryUploader
                    folder="devfolio/services"
                    buttonLabel="Upload Banner"
                    onUploadSuccess={(url) => setFormData({ ...formData, image: url })}
                  />
                </div>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/image/services/... or https://res.cloudinary.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                {formData.image && (
                  <div className="mt-2 relative h-20 w-36 rounded-lg overflow-hidden border border-slate-700">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  Tools & Technologies
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={toolInput}
                    onChange={(e) => setToolInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTool();
                      }
                    }}
                    placeholder="Add a tool (e.g. Next.js) and press Enter"
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddTool}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {formData.tools.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTool(t)}
                        className="hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
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
                  {saving ? "Saving..." : isEditing ? "Update Service" : "Add Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
