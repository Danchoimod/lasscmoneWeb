"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import { ChevronRight, Check, XCircle, Clock } from "lucide-react";
import Link from "next/link";

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
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;
  const params = useParams();
  const router = useRouter();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchPackage() {
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
    if (!pkg) return;
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
        <div className="p-8">Loading package for review...</div>
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
        <Link href="/profile/admin/packages" className="hover:text-gray-600">Packages</Link>
        <ChevronRight size={12} className="mx-1" />
        <span className="text-gray-600 font-medium">Review Package</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">{pkg.title || pkg.slug}</h1>
            <p className="text-xs text-gray-400 mt-1">Slug: <span className="font-mono">{pkg.slug}</span> | ID: {pkg.id}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-tight ${
                pkg.status === 1 ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
              }`}
            >
              Current Status: {pkg.status === 1 ? "Published" : "Draft"}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Package Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase">Short Summary</label>
                  <p className="text-sm text-gray-700 mt-1">{pkg.shortSummary || "No summary provided."}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase">Category</label>
                  <p className="text-sm text-gray-700 mt-1">{pkg.category?.name || "N/A"}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Author Info</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-bold text-gray-800">{pkg.user?.username || "Unknown"}</p>
                <p className="text-xs text-gray-500">{pkg.user?.email || "No email"}</p>
                <p className="text-[10px] text-gray-400 mt-2">Submitted on {new Date(pkg.createdAt).toLocaleDateString()}</p>
              </div>
            </section>
          </div>

          <section>
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Images Gallery</h2>
            {pkg.images && pkg.images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {pkg.images.map((img) => (
                  <div key={img.id} className="relative aspect-video rounded-lg overflow-hidden border border-gray-100 bg-gray-50 shadow-sm group">
                    <img 
                      src={img.url} 
                      alt="Package usage" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <a 
                      href={img.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] font-bold uppercase"
                    >
                      View Full
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-200 text-center text-gray-400 text-xs text-medium">
                No images available for this package.
              </div>
            )}
          </section>

          <section>
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Full Description</h2>
            <div className="prose prose-sm max-w-none bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="text-sm text-gray-700 whitespace-pre-wrap">{pkg.description || "No description provided."}</div>
            </div>
          </section>

          <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex space-x-4">
              <button
                disabled={updating || pkg.status === 1}
                onClick={() => updateStatus(1)}
                className={`flex items-center px-6 py-2 rounded text-xs font-bold uppercase transition-all ${
                  pkg.status === 1 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-green-600 text-white hover:bg-green-700 shadow-sm"
                }`}
              >
                <Check size={14} className="mr-2" /> Approve & Publish
              </button>

              <button
                disabled={updating || pkg.status === 0}
                onClick={() => updateStatus(0)}
                className={`flex items-center px-6 py-2 rounded text-xs font-bold uppercase transition-all ${
                    pkg.status === 0 
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                      : "bg-amber-500 text-white hover:bg-amber-600 shadow-sm"
                  }`}
              >
                <XCircle size={14} className="mr-2" /> Mark as Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
