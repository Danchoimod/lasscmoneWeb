"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import Link from "next/link";

export default function EditCommentPage() {
    const params = useParams();
    const router = useRouter();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchComment() {
            try {
                const res = await fetch(`/api-backend/admin/comments/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setContent(data.content || "");
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        if (params.id) fetchComment();
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch(`/api-backend/admin/comments/${params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });
            if (res.ok) {
                router.push("/profile/admin/comments");
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <MainLayout><div className="p-8">Loading comment...</div></MainLayout>;

    return (
        <MainLayout>
            <div className="flex items-center text-xs text-gray-400 mb-6">
                <span>Control Panel</span>
                <ChevronRight size={12} className="mx-1" />
                <span>Comments</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-gray-600 font-medium">Edit Comment</span>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <Link href="/profile/admin/comments" className="flex items-center text-gray-500 hover:text-gray-800">
                        <ChevronLeft size={20} className="mr-1" /> Back
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Edit Comment Content</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Comment Content</label>
                        <textarea
                            rows={8}
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 flex justify-center items-center"
                    >
                        <Save size={18} className="mr-2" /> {saving ? "Saving..." : "Update Comment"}
                    </button>
                </form>
            </div>
        </MainLayout>
    );
}
