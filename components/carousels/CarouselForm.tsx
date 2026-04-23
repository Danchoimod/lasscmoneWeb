"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Category { id: number; name: string; }
interface User { id: number; username: string; }
interface Package { id: number; title: string; }

interface CarouselFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function CarouselForm({ initialData, isEdit }: CarouselFormProps) {
    const router = useRouter();
    const { data: session } = useSession();
    const token = (session as any)?.accessToken;
    
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
        if (token) {
            fetchDependantData();
        }
    }, [token]);

    const fetchDependantData = async () => {
        try {
            const headers = { "Authorization": `Bearer ${token}` };
            const [catRes, userRes, pkgRes] = await Promise.all([
                fetch("/api-backend/admin/categories", { headers }),
                fetch("/api-backend/admin/users", { headers }),
                fetch("/api-backend/admin/packages", { headers })
            ]);
            const [catsJson, usersJson, pkgsJson] = await Promise.all([catRes.json(), userRes.json(), pkgRes.json()]);

            const cats = catsJson.data || catsJson;
            const usr = usersJson.data || usersJson;
            const pkg = pkgsJson.data || pkgsJson;

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
        if (!token) return;
        setLoading(true);
        const method = isEdit ? "PUT" : "POST";
        const url = isEdit ? `/api-backend/admin/carousels/${initialData.id}` : "/api-backend/admin/carousels";

        try {
            const res = await fetch(url, {
                method,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
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
                <Link href="/profile/admin/carousels" className="flex items-center text-[10px] font-bold uppercase text-gray-400 hover:text-indigo-600 transition-colors tracking-widest">
                    <ChevronLeft size={14} className="mr-1" /> Back to list
                </Link>
                <h1 className="text-xl font-bold text-gray-800 uppercase tracking-tight italic">{isEdit ? "Refine Carousel" : "Compose Slide"}</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl shadow-indigo-500/5 border border-gray-100 p-8 space-y-8">
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Display Headline</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                        placeholder="e.g. New Expansion Pack Released!"
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Narrative Summary</label>
                    <textarea
                        rows={3}
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium leading-relaxed"
                        placeholder="A brief teaser to engage users..."
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Visual Asset URL</label>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            required
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono text-xs"
                            placeholder="https://cdn.example.com/banner.jpg"
                        />
                        {formData.imageUrl && (
                            <div className="w-12 h-12 rounded-lg border border-gray-100 overflow-hidden bg-gray-50 flex-shrink-0">
                                <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Classification</label>
                        <select
                            required
                            value={formData.catId}
                            onChange={(e) => setFormData({ ...formData, catId: e.target.value })}
                            className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-xs uppercase appearance-none"
                        >
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Attributed User</label>
                        <select
                            required
                            value={formData.userId}
                            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                            className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-xs uppercase appearance-none"
                        >
                            {users.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
                        </select>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Associated Package (Optional)</label>
                    <select
                        value={formData.packageId}
                        onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-xs"
                    >
                        <option value="">No linked package</option>
                        {packages.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                    </select>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50 flex justify-center items-center active:scale-[0.98]"
                    >
                        {loading ? "Syncing..." : <><Save size={16} className="mr-2" /> Finalize Selection</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
