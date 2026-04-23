"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface UserFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function UserForm({ initialData, isEdit }: UserFormProps) {
    const router = useRouter();
    const { data: session } = useSession();
    const token = (session as any)?.accessToken;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: initialData?.username || "",
        email: initialData?.email || "",
        displayName: initialData?.displayName || "",
        status: initialData?.status?.toString() || "1",
        firebaseUid: initialData?.firebaseUid || "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;
        setLoading(true);
        const method = isEdit ? "PUT" : "POST";
        const url = isEdit ? `/api-backend/admin/users/${initialData.id}` : "/api-backend/admin/users";

        try {
            const res = await fetch(url, {
                method,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    status: parseInt(formData.status),
                }),
            });

            if (res.ok) {
                router.push("/profile/admin/users");
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
                <Link href="/profile/admin/users" className="flex items-center text-[10px] font-bold uppercase text-gray-400 hover:text-indigo-600 transition-colors tracking-widest">
                    <ChevronLeft size={14} className="mr-1" /> Back to accounts
                </Link>
                <h1 className="text-xl font-bold text-gray-800 uppercase tracking-tight italic">{isEdit ? "Refine User Profile" : "Onboard New Account"}</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl shadow-indigo-500/5 border border-gray-100 p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Username</label>
                        <input
                            type="text"
                            required
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                            placeholder="e.g. johndoe"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Public Display Name</label>
                        <input
                            type="text"
                            value={formData.displayName}
                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                            className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                            placeholder="e.g. John Doe"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Identity</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                        placeholder="john@example.com"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Firebase ID Reference</label>
                        <input
                            type="text"
                            value={formData.firebaseUid}
                            onChange={(e) => setFormData({ ...formData, firebaseUid: e.target.value })}
                            className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono text-xs"
                            placeholder="Optional UID"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Privilege Level</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-xs uppercase appearance-none"
                        >
                            <option value="1">Standard Active</option>
                            <option value="0">Banned / Suspended</option>
                            <option value="4">Full Admin / Verified</option>
                        </select>
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50 flex justify-center items-center active:scale-[0.98]"
                    >
                        {loading ? "Syncing..." : <><Save size={16} className="mr-2" /> {isEdit ? "Update Credentials" : "Authorize Account"}</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
