"use client";

import { useEffect, useState } from "react";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import { ChevronRight, Edit2, Trash2, Plus } from "lucide-react";
import Link from "next/link";

interface Category {
    id: number;
    name: string;
    param: string;
    parent?: { name: string };
    _count?: { packages: number };
}

export default function CategoryPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api-backend/admin/categories");
            const data = await res.json();
            if (Array.isArray(data)) setCategories(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`/api-backend/admin/categories/${id}`, { method: "DELETE" });
            if (res.ok) fetchCategories();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <MainLayout><div className="p-8">Loading...</div></MainLayout>;

    return (
        <MainLayout>
            <div className="flex items-center text-xs text-gray-400 mb-6">
                <span>Control Panel</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-gray-600 font-medium">Categories</span>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h1 className="text-base font-bold text-gray-800 uppercase tracking-tight">Categories Management</h1>
                    <Link href="/profile/admin/categories/new" className="bg-indigo-600 text-white px-4 py-2 rounded text-[10px] font-bold uppercase hover:bg-indigo-700 flex items-center shadow-sm">
                        <Plus size={14} className="mr-2" /> New Category
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-[#f9f9f9] text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 text-left border-b border-gray-100">Name</th>
                                <th className="px-6 py-4 text-left border-b border-gray-100">Param</th>
                                <th className="px-6 py-4 text-left border-b border-gray-100">Parent</th>
                                <th className="px-6 py-4 text-left border-b border-gray-100">Packages</th>
                                <th className="px-6 py-4 text-right border-b border-gray-100">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50 text-xs">
                            {categories.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-800 tracking-tight">{c.name}</td>
                                    <td className="px-6 py-4 text-gray-400 font-mono text-[10px]">{c.param}</td>
                                    <td className="px-6 py-4 text-gray-500 font-medium">{c.parent?.name || <span className="text-gray-300">None</span>}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight">{c._count?.packages || 0}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-4">
                                        <Link href={`/categories/${c.id}/edit`} className="text-indigo-600 hover:text-indigo-900 font-bold uppercase text-[10px] tracking-wider">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:text-red-700 font-bold uppercase text-[10px] tracking-wider">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
}
