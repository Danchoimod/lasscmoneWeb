"use client";

import { useEffect, useState } from "react";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import { ChevronRight, Plus, Download } from "lucide-react";
import Link from "next/link";

interface Version {
  id: number;
  platformType: number;
  versionNumber: string;
  url: string;
  createdAt: string;
}

const getPlatformName = (typeCode: number) => {
  switch (typeCode) {
    case 1: return "Android";
    case 2: return "Windows";
    case 3: return "iOS";
    case 4: return "Linux";
    default: return `Type ${typeCode}`;
  }
};

export default function VersionPage() {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVersions();
  }, []);

  const fetchVersions = async () => {
    try {
      const res = await fetch("/api-backend/admin/versions");
      const data = await res.json();
      if (Array.isArray(data)) setVersions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this version?")) return;
    try {
      const res = await fetch(`/api-backend/admin/versions/${id}`, { method: "DELETE" });
      if (res.ok) fetchVersions();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <MainLayout><div className="p-6 text-xs text-gray-400">Loading versions...</div></MainLayout>;

  return (
    <MainLayout>
      <div className="flex items-center text-xs text-gray-400 mb-6">
        <span>Control Panel</span>
        <ChevronRight size={12} className="mx-1" />
        <span className="text-gray-600 font-medium">Versions</span>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h1 className="text-base font-bold text-gray-800 uppercase tracking-tight">Version Management</h1>
          <Link
            href="/profile/admin/versions/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded text-[10px] font-bold uppercase hover:bg-indigo-700 flex items-center shadow-sm transition-colors"
          >
            <Plus size={14} className="mr-2" /> New Version
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-[#f9f9f9] text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left border-b border-gray-100">Version Number</th>
                <th className="px-6 py-4 text-left border-b border-gray-100">Platform</th>
                <th className="px-6 py-4 text-left border-b border-gray-100">Download URL</th>
                <th className="px-6 py-4 text-left border-b border-gray-100">Created At</th>
                <th className="px-6 py-4 text-right border-b border-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50 text-xs">
              {versions.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-800 tracking-tight">{v.versionNumber}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      {getPlatformName(v.platformType)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 truncate max-w-xs">
                    <a href={v.url} target="_blank" className="hover:text-indigo-600 flex items-center">
                        <Download size={12} className="mr-1" /> {v.url}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-[10px] font-bold uppercase">
                    {new Date(v.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <Link
                      href={`/versions/${v.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900 font-bold uppercase text-[10px] tracking-wider"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(v.id)}
                      className="text-red-500 hover:text-red-700 font-bold uppercase text-[10px] tracking-wider"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}
