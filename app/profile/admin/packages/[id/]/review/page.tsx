"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import { ChevronRight, Check, XCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Package {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortSummary: string;
  status: number;
  category?: { name: string };
  user?: { username: string; email: string };
  images?: { id: number; url: string }[];
  createdAt: string;
}

export default function ReviewPackagePage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchPackage() {
      if (!token) return;
      try {
        const id = params.id;
        const res = await fetch(`/api-backend/admin/packages/${id}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setPkg(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (params.id && token) fetchPackage();
  }, [params.id, token]);

  const updateStatus = async (newStatus: number) => {
    if (!pkg || !token) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api-backend/admin/packages/${pkg.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        // Success, redirect back to packages list
        router.push("/profile/admin/packages");
      }
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="p-8 text-gray-400 font-medium">Loading package for review...</div>
      </MainLayout>
    );
  }

  if (!pkg) {
    return (
      <MainLayout>
        <div className="p-8 text-red-500 font-bold">Package not found.</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex items-center text-xs text-gray-400 mb-6">
        <span>Control Panel</span>
        <ChevronRight size={12} className="mx-1" />
        <Link href="/profile/admin/packages" className="hover:text-gray-600 font-medium">Packages</Link>
        <ChevronRight size={12} className="mx-1" />
        <span className="text-gray-600 font-medium tracking-tight">Review Package</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800 uppercase tracking-tight">{pkg.title || pkg.slug}</h1>
            <p className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-widest">Slug: <span className="font-mono text-indigo-400">{pkg.slug}</span> | ID: #{pkg.id}</p>
          </div>
          <div className="flex items-center">
            <span
              className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-tight ${
                pkg.status === 1 ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
              }`}
            >
              Current Status: {pkg.status === 1 ? "Published" : "Under Review"}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b pb-1">Package Metadata</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Short Summary</label>
                  <p className="text-sm text-gray-700 mt-1 font-medium leading-relaxed">{pkg.shortSummary || "No summary provided."}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Category</label>
                  <p className="text-[10px] font-bold text-indigo-600 mt-1 bg-indigo-50 inline-block px-2 py-0.5 rounded uppercase">{pkg.category?.name || "N/A"}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b pb-1">Author Details</h2>
              <div className="bg-[#fcfcfc] border border-gray-100 p-5 rounded-xl">
                <p className="text-sm font-bold text-gray-800">{pkg.user?.username || "Unknown Author"}</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">{pkg.user?.email || "No email available"}</p>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                  <Clock size={10} className="mr-1" /> Submitted {new Date(pkg.createdAt).toLocaleDateString()}
                </div>
              </div>
            </section>
          </div>

          <section>
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b pb-1">Media Assets</h2>
            {pkg.images && pkg.images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {pkg.images.map((img) => (
                  <div key={img.id} className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 bg-gray-50 shadow-sm group">
                    <img 
                      src={img.url} 
                      alt="Package usage" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <a 
                      href={img.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] font-bold uppercase tracking-widest"
                    >
                      View Original
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-10 rounded-xl border-2 border-dashed border-gray-200 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                No visual assets provided
              </div>
            )}
          </section>

          <section>
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b pb-1">Content Description</h2>
            <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 italic">
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-medium">{pkg.description || "No description provided."}</div>
            </div>
          </section>

          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                disabled={updating || pkg.status === 1}
                onClick={() => updateStatus(1)}
                className={`flex items-center justify-center px-8 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all shadow-md ${
                  pkg.status === 1 
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed shadow-none" 
                    : "bg-green-600 text-white hover:bg-green-700 active:scale-95"
                }`}
              >
                <Check size={14} className="mr-2" /> Approve Content
              </button>

              <button
                disabled={updating || pkg.status === 0}
                onClick={() => updateStatus(0)}
                className={`flex items-center justify-center px-8 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all shadow-md ${
                    pkg.status === 0 
                      ? "bg-gray-100 text-gray-300 cursor-not-allowed shadow-none" 
                      : "bg-amber-500 text-white hover:bg-amber-600 active:scale-95"
                  }`}
              >
                <XCircle size={14} className="mr-2" /> Mark as Draft
              </button>
            </div>
            
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              Admin Review Tool v1.0
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
