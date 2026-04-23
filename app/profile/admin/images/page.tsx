"use client";

import { useEffect, useState } from "react";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import { ChevronRight, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface ImageItem {
    id: number;
    url: string;
    package?: { title: string };
}

export default function ImagePage() {
    const { data: session } = useSession();
    const token = (session as any)?.accessToken;
    const [images, setImages] = useState<ImageItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (token) fetchImages(page);
    }, [token, page]);

    const fetchImages = async (p: number) => {
        setLoading(true);
        try {
            const res = await fetch(`/api-backend/admin/images?page=${p}&limit=30`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const json = await res.json();
            if (json.data) {
                setImages(json.data);
                setTotalPages(json.totalPages || 1);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete image?")) return;
        try {
            const res = await fetch(`/api-backend/admin/images/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) setImages(images.filter(img => img.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <MainLayout><div className="p-8 text-gray-400 font-medium">Loading gallery...</div></MainLayout>;

    return (
        <MainLayout>
            <div className="flex items-center text-xs text-gray-400 mb-6">
                <span>Control Panel</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-gray-600 font-medium">Gallery</span>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h1 className="text-base font-bold text-gray-800 uppercase tracking-tight">Media Library</h1>
                    <Link href="/profile/admin/images/new" className="bg-indigo-600 text-white px-4 py-2 rounded text-[10px] font-bold uppercase hover:bg-indigo-700 flex items-center shadow-sm">
                        <Plus size={14} className="mr-2" /> Upload Image
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {images.map((img) => (
                        <div key={img.id} className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="aspect-square relative flex items-center justify-center bg-gray-50">
                                <img
                                    src={img.url}
                                    alt="Gallery"
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/300x300?text=Error')}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <button
                                    onClick={() => handleDelete(img.id)}
                                    className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-red-600"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                            <div className="p-2">
                                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider truncate mb-0.5">
                                    {img.package?.title || "Standalone"}
                                </p>
                                <p className="text-[9px] text-gray-400 truncate font-mono">ID: #{img.id}</p>
                            </div>
                        </div>
                    ))}
                    {images.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white rounded-xl border-2 border-dashed border-gray-100">
                            <div className="flex flex-col items-center text-gray-300">
                                <ImageIcon size={48} className="mb-2 opacity-50" />
                                <p className="font-medium">No media items found</p>
                            </div>
                        </div>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 pt-4">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button key={p} onClick={() => setPage(p)}
                                className={`px-3 py-1.5 text-[10px] font-bold rounded uppercase tracking-wider ${p === page ? "bg-indigo-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                                {p}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
