"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";

interface UserFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function UserForm({ initialData, isEdit }: UserFormProps) {
    const router = useRouter();
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
        setLoading(true);
        const method = isEdit ? "PUT" : "POST";
        const url = isEdit ? `/api-backend/admin/users/${initialData.id}` : "/api-backend/admin/users";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
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
                <Link href="/profile/admin/users" className="flex items-center text-gray-500 hover:text-gray-800 transition-colors">
                    <ChevronLeft size={20} className="mr-1" /> Back
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">{isEdit ? "Edit User" : "Add New User"}</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Username</label>
                        <input
                            type="text"
                            required
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="johndoe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Display Name</label>
                        <input
                            type="text"
                            value={formData.displayName}
                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="John Doe"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email Address</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="john@example.com"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Firebase UID (Optional)</label>
                        <input
                            type="text"
                            value={formData.firebaseUid}
                            onChange={(e) => setFormData({ ...formData, firebaseUid: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-xs"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive / Banned</option>
                            <option value="4">Verified / Đã xác thực</option>
                        </select>
                    </div>
                </div>

                <div className="pt-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 flex items-center shadow-md transition-all disabled:opacity-50"
                    >
                        <Save size={18} className="mr-2" />
                        {loading ? "Saving..." : isEdit ? "Update User" : "Create User"}
                    </button>
                </div>
            </form>
        </div>
    );
}
