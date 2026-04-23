"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Category {
    id: number;
    name: string;
}

interface CategoryFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function CategoryForm({ initialData, isEdit }: CategoryFormProps) {
    const router = useRouter();
    const { data: session } = useSession();
    const token = (session as any)?.accessToken;

    const [loading, setLoading] = useState(false);
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        param: initialData?.param || "",
        parentId: initialData?.parentId?.toString() || "",
    });

    useEffect(() => {
        if (token) {
            fetch("/api-backend/admin/categories", {
                headers: { "Authorization": `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(json => {
                const data = json.data || json;
                if (Array.isArray(data)) setAllCategories(data.filter((c: any) => c.id !== initialData?.id));
            });
        }
    }, [initialData?.id, token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;
        setLoading(true);
        const method = isEdit ? "PUT" : "POST";
        const url = isEdit ? `/api-backend/admin/categories/${initialData.id}` : "/api-backend/admin/categories";

        try {
            const res = await fetch(url, {
                method,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    parentId: formData.parentId ? parseInt(formData.parentId) : null,
                }),
            });

            if (res.ok) {
                router.push("/profile/admin/categories");
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <Link href="/profile/admin/categories" className="flex items-center text-[10px] font-bold uppercase text-gray-400 hover:text-indigo-600 transition-colors tracking-widest">
                    <ChevronLeft size={14} className="mr-1" /> Back to list
                </Link>
                <h1 className="text-xl font-bold text-gray-800 uppercase tracking-tight italic">{isEdit ? "Refine Category" : "New Classification"}</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl shadow-indigo-500/5 border border-gray-100 p-8 space-y-8">
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category Name</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                        placeholder="e.g. Action Games"
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">URL Param (Slug)</label>
                    <input
                        type="text"
                        required
                        value={formData.param}
                        onChange={(e) => setFormData({ ...formData, param: e.target.value })}
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono text-sm"
                        placeholder="action-games"
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Parent Hierarchy (Optional)</label>
                    <select
                        value={formData.parentId}
                        onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-xs uppercase appearance-none"
                    >
                        <option value="">None (Root Category)</option>
                        {allCategories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50 flex justify-center items-center active:scale-[0.98]"
                    >
                        {loading ? "Syncing..." : <><Save size={16} className="mr-2" /> {isEdit ? "Update Metadata" : "Finalize Category"}</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
