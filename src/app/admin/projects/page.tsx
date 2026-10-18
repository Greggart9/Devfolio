"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  X,
  UploadCloud,
  Check,
  AlertCircle,
  Video,
  Image as ImageIcon,
  Layers,
  Sparkles,
  Link as LinkIcon,
} from "lucide-react";
import CloudinaryUploader from "@/components/admin/CloudinaryUploader";
import { upsertProject, deleteProject } from "@/app/admin/actions";
import { Project } from "@/lib/data";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form state
  const initialFormState: Project = {
    slug: "",
    title: "",
    tagline: "",
    category: "Website",
    industry: "",
    service: "Frontend Development",
    year: "2026",
    client: "Personal Project",
    role: "Frontend Developer",
    duration: "2 Weeks",
    description: "",
    challenge: "",
    solution: "",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    cover: "",
    hero: "",
    video: "",
    screens: [],
    liveUrl: "",
    githubUrl: "",
  };

  const [formData, setFormData] = useState<Project>(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [screenInput, setScreenInput] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Error loading projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData(initialFormState);
    setError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setIsEditing(true);
    setFormData({
      ...project,
      tags: project.tags || [],
      screens: project.screens || [],
    });
    setError(null);
    setModalOpen(true);
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (!formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tagToRemove),
    });
  };

  const handleAddScreenUrl = () => {
    if (!screenInput.trim()) return;
    setFormData({
      ...formData,
      screens: [...formData.screens, screenInput.trim()],
    });
    setScreenInput("");
  };

  const handleRemoveScreen = (indexToRemove: number) => {
    setFormData({
      ...formData,
      screens: formData.screens.filter((_, idx) => idx !== indexToRemove),
    });
  };

  const handleAutoSlug = () => {
    if (!formData.title) return;
    const generated = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData({ ...formData, slug: generated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!formData.slug.trim() || !formData.title.trim() || !formData.cover.trim()) {
      setError("Slug, Title, and Cover image are required!");
      setSaving(false);
      return;
    }

    try {
      await upsertProject(formData);
      setSuccessMsg(`Project "${formData.title}" saved successfully!`);
      setTimeout(() => setSuccessMsg(null), 3000);
      setModalOpen(false);
      await fetchProjects();
    } catch (err: any) {
      setError(err.message || "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }

    try {
      await deleteProject(slug);
      await fetchProjects();
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PORTFOLIO CASE STUDIES</span>
          </div>
          <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">
            Projects Manager
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Add new projects, update existing case studies, upload CDN media, and edit all slug information.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Projects List */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 font-mono text-xs">
          Loading project catalogue...
        </div>
      ) : projects.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-800 rounded-2xl bg-[#0B111E]/50">
          <FolderGit2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-300 font-medium">No projects found in database</p>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Create your first project or run the database seed script.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
          >
            Create First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.slug}
              className="group bg-[#0E1524] border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Image Cover */}
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden border-b border-slate-800">
                  {proj.cover ? (
                    <img
                      src={proj.cover}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-600 text-xs font-mono">
                      No cover image
                    </div>
                  )}
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-[10px] font-mono text-blue-400">
                    {proj.category}
                  </span>
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-[10px] font-mono text-slate-400">
                    {proj.year || "2026"}
                  </span>
                </div>

                {/* Content info */}
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                    {proj.tagline || proj.description}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                    <span>Slug: /{proj.slug}</span>
                  </div>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {proj.tags?.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-slate-800/80 text-[10px] font-mono text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {proj.tags?.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-500">
                        +{proj.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-4 bg-slate-900/50 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                      title="Live URL"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                      title="GitHub URL"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={`/projects/${proj.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-blue-400 hover:underline px-1"
                  >
                    View Slug ↗
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(proj)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
                  >
                    <Edit2 className="w-3 h-3 text-blue-400" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(proj.slug, proj.title)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          FULL PROJECT EDITOR MODAL (100% OF FIELDS & SLUG PROPERTIES)
      ───────────────────────────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0D1424] border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl relative my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-display font-bold text-white">
                    {isEditing ? `Edit Project: ${formData.title}` : "Create New Project"}
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">
                    All case study & slug attributes save to PostgreSQL.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mx-6 mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
              {/* Row 1: Title, Slug, Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. ALDENA"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono text-slate-300 uppercase">
                      Slug (URL Path) *
                    </label>
                    <button
                      type="button"
                      onClick={handleAutoSlug}
                      className="text-[10px] font-mono text-blue-400 hover:underline"
                    >
                      Auto-generate
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    disabled={isEditing}
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. aldena"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. Creative Agency"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Row 2: Category, Industry, Service, Year */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Website / Web App"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g. Creative Agency"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Service
                  </label>
                  <input
                    type="text"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    placeholder="e.g. Frontend Development"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Row 3: Client, Role, Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Client
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Personal Project or Client Name"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Role
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Frontend Developer"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 2 Weeks"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Row 4: Description */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  Project Overview Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed summary of the project purpose, architecture, and features..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Row 5: Challenge & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Technical Challenge
                  </label>
                  <textarea
                    rows={4}
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    placeholder="What complex problems did this project need to solve?"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Engineering Solution
                  </label>
                  <textarea
                    rows={4}
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    placeholder="How did you architect and execute the solution?"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Row 6: Technology Tags Chip Input */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  Technologies / Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="e.g. Next.js, TypeScript, Tailwind"
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                  >
                    Add Tag
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags?.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Row 7: Media Assets & Cloudinary Uploaders */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
                <h3 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                  <UploadCloud className="w-4 h-4" />
                  <span>Media Assets (Cloudinary CDN Integration)</span>
                </h3>

                {/* Cover & Hero */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Cover */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-mono text-slate-300 uppercase">
                        Cover Thumbnail URL *
                      </label>
                      <CloudinaryUploader
                        folder="devfolio/projects"
                        buttonLabel="Upload Cover"
                        onUploadSuccess={(url) => setFormData({ ...formData, cover: url })}
                      />
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.cover}
                      onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                      placeholder="https://res.cloudinary.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    {formData.cover && (
                      <div className="mt-2 relative h-24 w-40 rounded-lg overflow-hidden border border-slate-700">
                        <img src={formData.cover} alt="Cover" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Hero */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-mono text-slate-300 uppercase">
                        Hero Header Image URL
                      </label>
                      <CloudinaryUploader
                        folder="devfolio/projects"
                        buttonLabel="Upload Hero"
                        onUploadSuccess={(url) => setFormData({ ...formData, hero: url })}
                      />
                    </div>
                    <input
                      type="text"
                      value={formData.hero || ""}
                      onChange={(e) => setFormData({ ...formData, hero: e.target.value })}
                      placeholder="Same as cover if left blank"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    {formData.hero && (
                      <div className="mt-2 relative h-24 w-40 rounded-lg overflow-hidden border border-slate-700">
                        <img src={formData.hero} alt="Hero" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Video Preview */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-blue-400" />
                      <span>Video Preview URL (Optional MP4)</span>
                    </label>
                    <CloudinaryUploader
                      folder="devfolio/videos"
                      accept="video/*"
                      buttonLabel="Upload Video"
                      onUploadSuccess={(url) => setFormData({ ...formData, video: url })}
                    />
                  </div>
                  <input
                    type="text"
                    value={formData.video || ""}
                    onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                    placeholder="https://res.cloudinary.com/... or Mixkit video URL"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Detail Screenshots Gallery */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>Detail Screenshots Gallery ({formData.screens?.length || 0})</span>
                    </label>
                    <CloudinaryUploader
                      folder="devfolio/screens"
                      buttonLabel="+ Upload Screenshot"
                      onUploadSuccess={(url) =>
                        setFormData({
                          ...formData,
                          screens: [...(formData.screens || []), url],
                        })
                      }
                    />
                  </div>

                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={screenInput}
                      onChange={(e) => setScreenInput(e.target.value)}
                      placeholder="Paste image URL directly..."
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddScreenUrl}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                    >
                      Add URL
                    </button>
                  </div>

                  {/* Screenshots thumbnail grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {formData.screens?.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-video rounded-lg overflow-hidden border border-slate-700 group bg-slate-950"
                      >
                        <img src={src} alt={`Screen ${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveScreen(idx)}
                          className="absolute top-1 right-1 p-1 rounded-md bg-black/70 text-red-400 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                          title="Remove Screenshot"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 8: Live and GitHub URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5 text-blue-400" />
                    <span>Live Demo URL</span>
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl || ""}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5 text-blue-400" />
                    <span>GitHub Repository URL</span>
                  </label>
                  <input
                    type="text"
                    value={formData.githubUrl || ""}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/25 transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <span>Saving to Database...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{isEditing ? "Update Project" : "Create Project"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
