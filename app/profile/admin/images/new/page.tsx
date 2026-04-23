"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import { ChevronLeft, ChevronRight, Save, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function NewImagePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [packages, setPackages] = useState<{ id: number, title: string }[]>([]);
    const [formData, setFormData] = useState({ url: "", packageId: "" });

    useEffect(() => {
        fetch("/api-backend/admin/packages")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setPackages(data);
                    if (data.length > 0) setFormData(prev => ({ ...prev, packageId: data[0].id.toString() }));
                }
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api-backend/admin/images", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    url: formData.url,
                    packageId: parseInt(formData.packageId)
                }),
            });
            if (res.ok) {
                router.push("/profile/admin/images");
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="flex items-center text-xs text-gray-400 mb-6">
                <span>Control Panel</span>
                <ChevronRight size={12} className="mx-1" />
                <span>Gallery</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-gray-600 font-medium">Add Image</span>
            </div>

            <div className="max-w-xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <Link href="/profile/admin/images" className="flex items-center text-gray-500 hover:text-gray-800">
                        <ChevronLeft size={20} className="mr-1" /> Back to library
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Upload Media</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="h-40 w-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden">
                            {formData.url ? (
                                <img src={formData.url} className="w-full h-full object-contain" alt="Preview" />
                            ) : (
                                <div className="text-center">
                                    <ImageIcon size={32} className="mx-auto text-gray-300 mb-2" />
                                    <p className="text-xs text-gray-400">Preview will appear here</p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Image URL</label>
                            <input
                                type="text"
                                required
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Assign to Package</label>
                            <select
                                required
                                value={formData.packageId}
                                onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {packages.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 flex justify-center items-center shadow-md shadow-indigo-100"
                    >
                        {loading ? "Adding..." : <><Save size={18} className="mr-2" /> Add to Library</>}
                    </button>
                </form>
            </div>
        </MainLayout>
    );
}
