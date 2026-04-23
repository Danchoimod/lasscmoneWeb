"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";

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
    const [loading, setLoading] = useState(false);
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        param: initialData?.param || "",
        parentId: initialData?.parentId?.toString() || "",
    });

    useEffect(() => {
        fetch("/api-backend/admin/categories")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setAllCategories(data.filter(c => c.id !== initialData?.id));
            });
    }, [initialData?.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const method = isEdit ? "PUT" : "POST";
        const url = isEdit ? `/api-backend/admin/categories/${initialData.id}` : "/api-backend/admin/categories";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
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
                <Link href="/profile/admin/categories" className="flex items-center text-gray-500 hover:text-gray-800 transition-colors">
                    <ChevronLeft size={20} className="mr-1" /> Back to list
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">{isEdit ? "Edit Category" : "New Category"}</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Category Name</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="e.g. Action Games"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Param (Slug)</label>
                    <input
                        type="text"
                        required
                        value={formData.param}
                        onChange={(e) => setFormData({ ...formData, param: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono"
                        placeholder="action-games"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Parent Category (Optional)</label>
                    <select
                        value={formData.parentId}
                        onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="">None (Top Level)</option>
                        {allCategories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className="pt-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 flex items-center shadow-md transition-all disabled:opacity-50"
                    >
                        <Save size={18} className="mr-2" />
                        {loading ? "Saving..." : isEdit ? "Update Category" : "Save Category"}
                    </button>
                </div>
            </form>
        </div>
    );
}
