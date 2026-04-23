"use client";

import { useEffect, useState } from "react";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import { ChevronRight, Edit2, Trash2, Plus, Check, XCircle } from "lucide-react";
import Link from "next/link";

interface Package {
  id: number;
  title: string;
  slug: string;
  category?: { name: string };
  user?: { username: string };
  ratingAvg?: number;
  ratingCount?: number;
  status: number;
}

import { useSession } from "next-auth/react";

export default function PackagePage() {
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    if (token) {
      fetchPackages();
    }
  }, [token]);

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api-backend/admin/packages?limit=100", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const json = await res.json();
      if (json.data) setPackages(json.data);
    } catch (err) {
      console.error("Fetch packages failed", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPackages = packages.filter((p) => {
    if (statusFilter === "all") return true;
    return p.status.toString() === statusFilter;
  });

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    try {
      const res = await fetch(`/api-backend/admin/packages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPackages(packages.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id: number, newStatus: number) => {
    try {
      const res = await fetch(`/api-backend/admin/packages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setPackages(packages.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center text-xs text-gray-400 mb-6">
          <span>Control Panel</span>
          <ChevronRight size={12} className="mx-1" />
          <span className="text-gray-600 font-medium">Packages</span>
        </div>
        <div className="font-medium text-gray-500">Loading packages...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex items-center text-xs text-gray-400 mb-6">
        <span>Control Panel</span>
        <ChevronRight size={12} className="mx-1" />
        <span className="text-gray-600 font-medium">Packages</span>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <h1 className="text-base font-bold text-gray-800 uppercase tracking-tight">Packages Management</h1>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded px-2 py-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase mr-2 pointer-events-none">Filter:</span>
              <select
                className="bg-transparent text-xs font-bold text-gray-600 focus:outline-none cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="1">Published</option>
                <option value="0">Draft</option>
              </select>
            </div>
          </div>
          <Link
            href="/profile/admin/packages/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded text-xs font-bold uppercase hover:bg-indigo-700 flex items-center shadow-sm transition-colors"
          >
            <Plus size={14} className="mr-2" /> New Package
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-[#f9f9f9] text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left border-b border-gray-100">Title/Slug</th>
                <th className="px-6 py-4 text-left border-b border-gray-100">Category</th>
                <th className="px-6 py-4 text-left border-b border-gray-100">Author</th>
                <th className="px-6 py-4 text-left border-b border-gray-100">Rating</th>
                <th className="px-6 py-4 text-left border-b border-gray-100">Status</th>
                <th className="px-6 py-4 text-right border-b border-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50 text-xs">
              {filteredPackages.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-gray-800 font-bold">{p.title || p.slug}</div>
                    <div className="text-[10px] text-gray-400 font-mono mt-0.5">{p.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{p.category?.name || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-600">{p.user?.username || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="text-yellow-500">★</span> {(p.ratingAvg || 0).toFixed(1)} <span className="text-gray-300 ml-1">({p.ratingCount || 0})</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${p.status === 1 ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                        }`}
                    >
                      {p.status === 1 ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    {p.status !== 1 ? (
                      <button
                        onClick={() => updateStatus(p.id, 1)}
                        className="text-green-600 hover:text-green-800 font-bold uppercase text-[10px] tracking-wider inline-flex items-center"
                      >
                        <Check size={12} className="mr-1" /> Accept
                      </button>
                    ) : (
                      <button
                        onClick={() => updateStatus(p.id, 0)}
                        className="text-orange-500 hover:text-orange-700 font-bold uppercase text-[10px] tracking-wider inline-flex items-center"
                      >
                        <XCircle size={12} className="mr-1" /> Unpublish
                      </button>
                    )}
                    <Link
                      href={`/packages/${p.id}/review`}
                      className="text-amber-600 hover:text-amber-900 font-bold uppercase text-[10px] tracking-wider"
                    >
                      Review
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-500 hover:text-red-700 font-bold uppercase text-[10px] tracking-wider"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPackages.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                    No packages found matching this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}
