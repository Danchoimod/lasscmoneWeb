"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";

interface Category { id: number; name: string; }
interface User { id: number; username: string; }

interface PackageFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function PackageForm({ initialData, isEdit }: PackageFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        description: initialData?.description || "",
        shortSummary: initialData?.shortSummary || "",
        status: initialData?.status?.toString() || "0",
        catId: initialData?.catId?.toString() || "",
        userId: initialData?.userId?.toString() || "",
        imageUrl: initialData?.images?.[0]?.url || "",
    });

    useEffect(() => {
        fetchDependantData();
    }, []);

    const fetchDependantData = async () => {
        try {
            const [catsRes, usersRes] = await Promise.all([
                fetch("/api-backend/admin/categories"),
                fetch("/api-backend/admin/users"),
            ]);
            const [catsData, usersData] = await Promise.all([catsRes.json(), usersRes.json()]);
            if (Array.isArray(catsData)) {
                setCategories(catsData);
                if (!formData.catId && catsData.length > 0) setFormData(prev => ({ ...prev, catId: catsData[0].id.toString() }));
            }
            if (Array.isArray(usersData)) {
                setUsers(usersData);
                if (!formData.userId && usersData.length > 0) setFormData(prev => ({ ...prev, userId: usersData[0].id.toString() }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const method = isEdit ? "PUT" : "POST";
        const url = isEdit ? `/api-backend/admin/packages/${initialData.id}` : "/api-backend/admin/packages";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    catId: parseInt(formData.catId),
                    userId: parseInt(formData.userId),
                    status: parseInt(formData.status),
                }),
            });

            if (res.ok) {
                router.push("/profile/admin/packages");
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <Link href="/profile/admin/packages" className="flex items-center text-gray-500 hover:text-gray-800 transition-colors">
                    <ChevronLeft size={20} className="mr-1" /> Back to list
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">{isEdit ? "Edit Package" : "Create New Package"}</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Package Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="e.g. My Awesome Mod"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Handle / Slug</label>
                        <input
                            type="text"
                            required
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono"
                            placeholder="my-awesome-mod"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Short Summary</label>
                    <input
                        type="text"
                        value={formData.shortSummary}
                        onChange={(e) => setFormData({ ...formData, shortSummary: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="A brief description of what this does"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Detailed Description</label>
                    <textarea
                        rows={6}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="Tell us everything about this package..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Main Image URL</label>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <input
                                type="url"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="https://example.com/image.png"
                            />
                        </div>
                        {formData.imageUrl && (
                            <div className="h-10 w-10 rounded border overflow-hidden bg-gray-50">
                                <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Category</label>
                        <select
                            required
                            value={formData.catId}
                            onChange={(e) => setFormData({ ...formData, catId: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Author</label>
                        <select
                            required
                            value={formData.userId}
                            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            {users.map((u) => (
                                <option key={u.id} value={u.id}>{u.username}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="0">Draft</option>
                            <option value="1">Published</option>
                        </select>
                    </div>
                </div>

                <div className="pt-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 flex items-center shadow-md transition-all active:scale-95 disabled:opacity-50"
                    >
                        <Save size={18} className="mr-2" />
                        {loading ? "Saving..." : isEdit ? "Update Package" : "Save Package"}
                    </button>
                </div>
            </form>
        </div>
    );
}
