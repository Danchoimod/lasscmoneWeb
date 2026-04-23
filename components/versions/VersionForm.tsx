"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface VersionFormProps {
  id?: string;
}

export default function VersionForm({ id }: VersionFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    versionNumber: "",
    platformType: "1",
    url: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api-backend/admin/versions/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            versionNumber: data.versionNumber || "",
            platformType: data.platformType?.toString() || "1",
            url: data.url || "",
          });
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const method = id ? "PUT" : "POST";
    const endpoint = id ? `/api-backend/admin/versions/${id}` : "/api-backend/admin/versions";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) router.push("/profile/admin/versions");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4 max-w-2xl">
      <div>
        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Version Number</label>
        <input
          type="text"
          value={formData.versionNumber}
          onChange={(e) => setFormData({ ...formData, versionNumber: e.target.value })}
          className="w-full bg-[#f9f9f9] border-none p-3 rounded text-xs text-gray-700 outline-none"
          placeholder="e.g. 1.0.5"
          required
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Platform</label>
        <select
          value={formData.platformType}
          onChange={(e) => setFormData({ ...formData, platformType: e.target.value })}
          className="w-full bg-[#f9f9f9] border-none p-3 rounded text-xs text-gray-700 outline-none cursor-pointer"
        >
          <option value="1">Android</option>
          <option value="2">Windows</option>
          <option value="3">iOS</option>
          <option value="4">Linux</option>
        </select>
      </div>
      <div>
        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Download URL</label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="w-full bg-[#f9f9f9] border-none p-3 rounded text-xs text-gray-700 outline-none"
          placeholder="https://..."
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-2 rounded text-[10px] font-bold uppercase hover:bg-indigo-700 shadow-sm transition-colors"
      >
        {loading ? "Saving..." : "Save Version"}
      </button>
    </form>
  );
}
