"use client";

import { useEffect, useState } from "react";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import { ChevronRight, Edit2, Trash2, Plus, Layout } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Carousel {
    id: number;
    title: string;
    summary: string;
    imageUrl: string;
    category?: { name: string };
    user?: { username: string };
    package?: { title: string };
}

export default function CarouselPage() {
    const { data: session } = useSession();
    const token = (session as any)?.accessToken;
    const [carousels, setCarousels] = useState<Carousel[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (token) fetchCarousels(page);
    }, [token, page]);

    const fetchCarousels = async (p: number) => {
        setLoading(true);
        try {
            const res = await fetch(`/api-backend/admin/carousels?page=${p}&limit=20`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const json = await res.json();
            if (json.data) {
                setCarousels(json.data);
                setTotalPages(json.totalPages || 1);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this carousel item?")) return;
        try {
            const res = await fetch(`/api-backend/admin/carousels/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) fetchCarousels(page);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <MainLayout><div className="p-8 text-gray-400 font-medium">Loading carousels...</div></MainLayout>;

    return (
        <MainLayout>
            <div className="flex items-center text-xs text-gray-400 mb-6">
                <span>Control Panel</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-gray-600 font-medium">Carousels</span>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h1 className="text-base font-bold text-gray-800 uppercase tracking-tight">Carousel Management</h1>
                    <Link href="/profile/admin/carousels/new" className="bg-indigo-600 text-white px-4 py-2 rounded text-[10px] font-bold uppercase hover:bg-indigo-700 flex items-center shadow-sm">
                        <Plus size={14} className="mr-2" /> New Carousel
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {carousels.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
                            <div className="h-44 bg-gray-50 relative border-b border-gray-50">
                                <img
                                    src={item.imageUrl}
                                    className="w-full h-full object-cover relative z-10"
                                    alt={item.title}
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = "https://placehold.co/600x400?text=No+Image";
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center text-gray-200">
                                    <Layout size={40} />
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all z-20"></div>
                                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-30">
                                    <Link href={`/profile/admin/carousels/${item.id}/edit`} className="bg-white p-2 rounded shadow text-indigo-600 hover:scale-110 transition-transform font-bold uppercase text-[10px] flex items-center">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(item.id)} className="bg-white p-2 rounded shadow text-red-500 hover:scale-110 transition-transform font-bold uppercase text-[10px] flex items-center">
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="p-5 space-y-2">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-bold uppercase text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded tracking-tighter">{item.category?.name || "Uncategorized"}</span>
                                </div>
                                <h3 className="font-bold text-gray-800 text-sm truncate uppercase tracking-tight" title={item.title}>{item.title}</h3>
                                <p className="text-[11px] text-gray-500 line-clamp-2 h-8 leading-relaxed font-medium">{item.summary}</p>
                                <div className="pt-3 border-t border-gray-50 flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                    <span className="flex items-center"><Layout size={10} className="mr-1" /> {item.user?.username || "—"}</span>
                                    {item.package && <span className="text-indigo-400">Pkg: {item.package.title}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                    {carousels.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 text-gray-400">
                            No carousels found. Start by creating one!
                        </div>
                    )}
                </div>

                {/* Pagination */}
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
