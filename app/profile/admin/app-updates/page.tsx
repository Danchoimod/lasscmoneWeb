"use client";

import { useEffect, useState } from "react";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import { ChevronRight, Plus, Download, Smartphone, Monitor } from "lucide-react";
import Link from "next/link";

interface AppUpdate {
  id: number;
  platform: string;
  versionName: string;
  versionCode: number;
  isForce: boolean;
  downloadUrl: string;
  changelog: string | null;
  createdAt: string;
}

export default function AppUpdatesPage() {
  const [updates, setUpdates] = useState<AppUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const res = await fetch("/api-backend/admin/app-updates");
      const data = await res.json();
      if (Array.isArray(data)) setUpdates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this update record?")) return;
    try {
      const res = await fetch(`/api-backend/admin/app-updates/${id}`, { method: "DELETE" });
      if (res.ok) fetchUpdates();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <MainLayout><div className="p-6 text-xs text-gray-400 font-bold uppercase">Loading updates...</div></MainLayout>;

  return (
    <MainLayout>
      <div className="flex items-center text-[10px] text-gray-400 mb-6 font-bold uppercase tracking-wider">
        <span>Control Panel</span>
        <ChevronRight size={10} className="mx-1" />
        <span className="text-gray-600">App Updates</span>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h1 className="text-base font-bold text-gray-800 uppercase tracking-tight">App Update Management</h1>
          <Link
            href="/profile/admin/app-updates/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded text-[10px] font-bold uppercase hover:bg-indigo-700 flex items-center shadow-sm transition-colors"
          >
            <Plus size={14} className="mr-2" /> New Update
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-[#f9f9f9] text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left border-b border-gray-100">Platform</th>
                <th className="px-6 py-4 text-left border-b border-gray-100">Version</th>
                <th className="px-6 py-4 text-left border-b border-gray-100">Code</th>
                <th className="px-6 py-4 text-left border-b border-gray-100">Force</th>
                <th className="px-6 py-4 text-left border-b border-gray-100">Created At</th>
                <th className="px-6 py-4 text-right border-b border-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50 text-xs">
              {updates.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                        {u.platform === "android" ? <Smartphone size={14} className="mr-2 text-green-600" /> : <Monitor size={14} className="mr-2 text-blue-600" />}
                        <span className="font-bold text-gray-800 uppercase text-[10px]">{u.platform}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-700">{u.versionName}</td>
                  <td className="px-6 py-4 text-gray-500 font-mono">{u.versionCode}</td>
                  <td className="px-6 py-4">
                    {u.isForce ? (
                        <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase">Required</span>
                    ) : (
                        <span className="bg-gray-50 text-gray-400 px-2 py-0.5 rounded text-[9px] font-bold uppercase">Optional</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-[10px] font-bold uppercase">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <Link
                      href={`/app-updates/${u.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900 font-bold uppercase text-[10px] tracking-wider"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="text-red-500 hover:text-red-700 font-bold uppercase text-[10px] tracking-wider"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {updates.length === 0 && (
                  <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-gray-400 font-medium uppercase text-[10px]">No update records found</td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}
