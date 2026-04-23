"use client";

import { useEffect, useState } from "react";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import { ChevronRight, Trash2, MessageSquare, Edit2 } from "lucide-react";
import Link from "next/link";

interface Comment {
    id: number;
    content: string;
    createdAt: string;
    user: { username: string };
    package: { title: string };
    parent?: { content: string };
}

import { useSession } from "next-auth/react";

export default function CommentPage() {
    const { data: session } = useSession();
    const token = (session as any)?.accessToken;
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            fetchComments();
        }
    }, [token]);

    const fetchComments = async () => {
        try {
            const res = await fetch("/api-backend/admin/comments", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            if (Array.isArray(data)) setComments(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this comment?")) return;
        try {
            const res = await fetch(`/api-backend/admin/comments/${id}`, { method: "DELETE" });
            if (res.ok) fetchComments();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <MainLayout><div className="p-6">Loading...</div></MainLayout>;

    return (
        <MainLayout>
            <div className="flex items-center text-xs text-gray-400 mb-6">
                <span>Control Panel</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-gray-600 font-medium">Comments</span>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
                    <h1 className="text-base font-bold text-gray-800 uppercase tracking-tight">Comments Management</h1>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-[#f9f9f9] text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 text-left border-b border-gray-100">Content</th>
                                <th className="px-6 py-4 text-left border-b border-gray-100">Author</th>
                                <th className="px-6 py-4 text-left border-b border-gray-100">Package</th>
                                <th className="px-6 py-4 text-left border-b border-gray-100">Reply To</th>
                                <th className="px-6 py-4 text-left border-b border-gray-100">Date</th>
                                <th className="px-6 py-4 text-right border-b border-gray-100">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50 text-xs">
                            {comments.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="text-gray-800 font-medium line-clamp-2 max-w-md">{c.content}</p>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-bold">{c.user?.username || 'Unknown'}</td>
                                    <td className="px-6 py-4 text-gray-600 cursor-help" title={c.package?.title}>
                                        <span className="truncate block w-32 font-medium">{c.package?.title || 'N/A'}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 italic">
                                        {c.parent ? <span className="line-clamp-1 text-[10px]">"{c.parent?.content}"</span> : <span className="text-gray-200">-</span>}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-[10px] font-bold uppercase">{new Date(c.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
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
