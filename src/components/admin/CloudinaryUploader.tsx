"use client";

import { useState, useRef } from "react";
import { UploadCloud, Loader2, Check, AlertCircle } from "lucide-react";

interface CloudinaryUploaderProps {
  onUploadSuccess: (url: string) => void;
  folder?: string;
  accept?: string;
  buttonLabel?: string;
  className?: string;
}

export default function CloudinaryUploader({
  onUploadSuccess,
  folder = "devfolio",
  accept = "image/*",
  buttonLabel = "Upload to Cloudinary",
  className = "",
}: CloudinaryUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);
    setUploaded(false);

    try {
      if (file.size > 4.5 * 1024 * 1024) {
        throw new Error(
          "File exceeds 4.5MB upload limit. Please paste your Cloudinary URL directly into the field below."
        );
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type") || "";
      if (!res.ok) {
        let errMsg = "Failed to upload file";
        if (contentType.includes("application/json")) {
          const errData = await res.json();
          errMsg = errData.error || errMsg;
        } else {
          const text = await res.text();
          if (res.status === 413 || text.includes("Request Entity Too Large")) {
            errMsg = "File is too large for direct upload. Please paste a Cloudinary URL directly.";
          } else {
            errMsg = `Upload failed (${res.status}): ${text.slice(0, 100)}`;
          }
        }
        throw new Error(errMsg);
      }

      const data = await res.json();
      onUploadSuccess(data.url);
      setUploaded(true);
      setTimeout(() => setUploaded(false), 3000);
    } catch (err: any) {
      setError(err.message || "Upload error");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className={`inline-block ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />
      <button
        type="button"
        disabled={uploading}
        onClick={() => fileInputRef.current?.click()}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-mono font-medium transition-all active:scale-95 disabled:opacity-50"
      >
        {uploading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
            <span>Uploading CDN...</span>
          </>
        ) : uploaded ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">Uploaded!</span>
          </>
        ) : (
          <>
            <UploadCloud className="w-3.5 h-3.5" />
            <span>{buttonLabel}</span>
          </>
        )}
      </button>

      {error && (
        <p
          onClick={() => setError(null)}
          className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-mono cursor-pointer hover:opacity-80 transition-opacity"
          title="Click to dismiss"
        >
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{error}</span>
          <span className="text-[10px] text-slate-500 ml-1">(click to dismiss)</span>
        </p>
      )}
    </div>
  );
}
