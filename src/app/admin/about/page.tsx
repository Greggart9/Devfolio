"use client";

import { useState, useEffect } from "react";
import {
  UserCheck,
  Check,
  AlertCircle,
  FileText,
  UploadCloud,
  Plus,
  Trash2,
} from "lucide-react";
import CloudinaryUploader from "@/components/admin/CloudinaryUploader";
import { updateAboutProfile } from "@/app/admin/actions";
import { AboutProfile } from "@/lib/data-service";

export default function AdminAboutPage() {
  const [profile, setProfile] = useState<AboutProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [highlightInput, setHighlightInput] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/about");
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAddHighlight = () => {
    if (!highlightInput.trim() || !profile) return;
    if (!profile.highlights.includes(highlightInput.trim())) {
      setProfile({
        ...profile,
        highlights: [...profile.highlights, highlightInput.trim()],
      });
    }
    setHighlightInput("");
  };

  const handleRemoveHighlight = (itemToRemove: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      highlights: profile.highlights.filter((h) => h !== itemToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setError(null);

    try {
      const res = await updateAboutProfile(profile);
      if (res && res.success === false) {
        setError(res.error || "Failed to update about profile");
        return;
      }
      setSuccessMsg("About profile saved successfully!");
      setTimeout(() => setSuccessMsg(null), 3000);
      await fetchProfile();
    } catch (err: any) {
      setError(err.message || "Failed to update about profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500 font-mono text-xs">
        Loading about details...
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs mb-2">
          <UserCheck className="w-3.5 h-3.5" />
          <span>PORTFOLIO PROFILE & BIO</span>
        </div>
        <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">
          About Me Settings
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Update your personal bio, headline, experience years, resume link, and profile portrait.
        </p>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-[#0E1524] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        {/* Avatar and Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start pb-6 border-b border-slate-800">
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-mono text-slate-300 uppercase">
                Profile Portrait URL
              </label>
              <CloudinaryUploader
                folder="devfolio/profile"
                buttonLabel="Upload Portrait"
                onUploadSuccess={(url) => setProfile({ ...profile, avatar_url: url })}
              />
            </div>
            <input
              type="text"
              value={profile.avatar_url || ""}
              onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
              placeholder="https://res.cloudinary.com/..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-4">
            {profile.avatar_url && (
              <div className="w-20 h-24 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Years of Exp
              </label>
              <input
                type="text"
                value={profile.experience_years}
                onChange={(e) => setProfile({ ...profile, experience_years: e.target.value })}
                placeholder="3+"
                className="w-24 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 text-center font-bold"
              />
            </div>
          </div>
        </div>

        {/* Headlines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
              Headline
            </label>
            <input
              type="text"
              required
              value={profile.headline}
              onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
              placeholder="Code that's clean,"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
              Subheadline (Accent Gradient)
            </label>
            <input
              type="text"
              required
              value={profile.subheadline}
              onChange={(e) => setProfile({ ...profile, subheadline: e.target.value })}
              placeholder="fast & production-ready."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Intro */}
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
            Intro Paragraph (Bold Summary)
          </label>
          <textarea
            rows={3}
            required
            value={profile.intro}
            onChange={(e) => setProfile({ ...profile, intro: e.target.value })}
            placeholder="I’m Olúwadámiláre, a frontend developer focused on..."
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Detailed Bio */}
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
            Detailed Bio Paragraph
          </label>
          <textarea
            rows={4}
            required
            value={profile.detailed_bio}
            onChange={(e) => setProfile({ ...profile, detailed_bio: e.target.value })}
            placeholder="My focus is on modern web development..."
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Highlights Checklist */}
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
            Profile Highlights / Badges
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={highlightInput}
              onChange={(e) => setHighlightInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddHighlight();
                }
              }}
              placeholder="Add highlight (e.g. Pixel-Perfect UI Execution) and press Enter"
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddHighlight}
              className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold"
            >
              Add
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {profile.highlights.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-200"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveHighlight(item)}
                  className="text-slate-500 hover:text-red-400 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Resume URL */}
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Full Resume URL (Google Docs / PDF)</span>
          </label>
          <input
            type="url"
            required
            value={profile.resume_url}
            onChange={(e) => setProfile({ ...profile, resume_url: e.target.value })}
            placeholder="https://docs.google.com/document/d/..."
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end pt-4 border-t border-slate-800">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/25 transition-all disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save About Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
