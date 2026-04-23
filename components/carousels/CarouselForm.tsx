"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";

interface Category { id: number; name: string; }
interface User { id: number; username: string; }
interface Package { id: number; title: string; }

interface CarouselFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function CarouselForm({ initialData, isEdit }: CarouselFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [packages, setPackages] = useState<Package[]>([]);

    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        summary: initialData?.summary || "",
        imageUrl: initialData?.imageUrl || "",
        catId: initialData?.catId?.toString() || "",
        userId: initialData?.userId?.toString() || "",
        packageId: initialData?.packageId?.toString() || "",
    });

    useEffect(() => {
        fetchDependantData();
    }, []);

    const fetchDependantData = async () => {
        try {
            const [catRes, userRes, pkgRes] = await Promise.all([
                fetch("/api-backend/admin/categories"),
                fetch("/api-backend/admin/users"),
                fetch("/api-backend/admin/packages")
            ]);
            const [cats, usr, pkg] = await Promise.all([catRes.json(), userRes.json(), pkgRes.json()]);

            if (Array.isArray(cats)) {
                setCategories(cats);
                if (!formData.catId && cats.length > 0) setFormData(p => ({ ...p, catId: cats[0].id.toString() }));
            }
            if (Array.isArray(usr)) {
                setUsers(usr);
                if (!formData.userId && usr.length > 0) setFormData(p => ({ ...p, userId: usr[0].id.toString() }));
            }
            if (Array.isArray(pkg)) setPackages(pkg);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const method = isEdit ? "PUT" : "POST";
        const url = isEdit ? `/api-backend/admin/carousels/${initialData.id}` : "/api-backend/admin/carousels";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    catId: parseInt(formData.catId),
                    userId: parseInt(formData.userId),
                    packageId: formData.packageId ? parseInt(formData.packageId) : null,
                }),
            });

            if (res.ok) {
                router.push("/profile/admin/carousels");
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <Link href="/profile/admin/carousels" className="flex items-center text-gray-500 hover:text-gray-800">
                    <ChevronLeft size={20} className="mr-1" /> Back
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">{isEdit ? "Edit Carousel" : "New Carousel Item"}</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Display Title</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Main headline for this slide"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Short Summary</label>
                    <textarea
                        rows={3}
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Briefly describe what this is about..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Image URL</label>
                    <input
                        type="text"
                        required
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                        placeholder="https://example.com/slide.jpg"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Category Tag</label>
                        <select
                            required
                            value={formData.catId}
                            onChange={(e) => setFormData({ ...formData, catId: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Assigned User</label>
                        <select
                            required
                            value={formData.userId}
                            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {users.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Link to Package (Optional)</label>
                    <select
                        value={formData.packageId}
                        onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">None</option>
                        {packages.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                    </select>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 flex justify-center items-center shadow-md"
                    >
                        {loading ? "Saving..." : <><Save size={18} className="mr-2" /> Save Carousel Item</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
