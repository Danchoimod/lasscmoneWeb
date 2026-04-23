"use client";

import { useEffect, useState } from "react";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import { ChevronRight, Save, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function AppUpdateFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    platform: "android",
    versionName: "",
    versionCode: "",
    isForce: false,
    downloadUrl: "",
    changelog: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit && id) {
      setFetching(true);
      fetch(`/api-backend/admin/app-updates/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            setFormData({
              platform: data.platform || "android",
              versionName: data.versionName || "",
              versionCode: String(data.versionCode || ""),
              isForce: data.isForce || false,
              downloadUrl: data.downloadUrl || "",
              changelog: data.changelog || "",
            });
          }
        })
        .catch(err => console.error(err))
        .finally(() => setFetching(false));
    } else {
        setFetching(false);
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isEdit ? `/api-backend/admin/app-updates/${id}` : "/api-backend/admin/app-updates";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          versionCode: parseInt(formData.versionCode)
        }),
      });

      if (res.ok) {
        router.push("/profile/admin/app-updates");
        router.refresh();
      } else {
        const errData = await res.json();
        alert("Error: " + (errData.error || "Failed to save"));
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <MainLayout><div className="p-6 text-xs text-gray-400 font-bold uppercase tracking-widest animate-pulse">Loading data...</div></MainLayout>;

  return (
    <MainLayout>
      <div className="flex items-center text-[10px] text-gray-400 mb-6 font-bold uppercase tracking-wider">
        <span>Control Panel</span>
        <ChevronRight size={10} className="mx-1" />
        <Link href="/profile/admin/app-updates" className="hover:text-gray-600">App Updates</Link>
        <ChevronRight size={10} className="mx-1" />
        <span className="text-gray-600 underline decoration-indigo-500 underline-offset-4">{isEdit ? "Edit Update" : "New Update"}</span>
      </div>

      <div className="max-w-3xl bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#f9f9f9] px-6 py-4 border-b border-gray-100">
          <h2 className="text-xs font-bold text-gray-800 uppercase tracking-tight">
            {isEdit ? "Update Selection Info" : "Register New App Update"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Platform</label>
              <select
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold uppercase"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              >
                <option value="android">Android</option>
                <option value="windows">Windows</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Force Update</label>
              <div className="flex items-center space-x-4 h-[38px]">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.isForce}
                    onChange={(e) => setFormData({ ...formData, isForce: e.target.checked })}
                  />
                  <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  <span className="ms-3 text-[10px] font-bold text-gray-400 uppercase">Is Required?</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Version Name</label>
              <input
                type="text"
                required
                placeholder="e.g. 2.1.0"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={formData.versionName}
                onChange={(e) => setFormData({ ...formData, versionName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Version Code</label>
              <input
                type="number"
                required
                placeholder="e.g. 21"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={formData.versionCode}
                onChange={(e) => setFormData({ ...formData, versionCode: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Download URL</label>
            <input
              type="url"
              required
              placeholder="https://..."
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-indigo-600"
              value={formData.downloadUrl}
              onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Changelog (Markdown supported)</label>
            <textarea
              rows={4}
              placeholder="What's new in this version..."
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={formData.changelog}
              onChange={(e) => setFormData({ ...formData, changelog: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-50">
            <Link href="/profile/admin/app-updates" className="px-4 py-2 border border-gray-200 text-gray-500 rounded text-[10px] font-bold uppercase hover:bg-gray-50 flex items-center transition-colors">
              <X size={14} className="mr-2" /> Cancel
            </Link>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-indigo-600 text-white rounded text-[10px] font-bold uppercase hover:bg-indigo-700 flex items-center shadow-sm transition-colors disabled:opacity-50">
              <Save size={14} className="mr-2" /> {loading ? "Saving..." : isEdit ? "Update Info" : "Save Record"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
