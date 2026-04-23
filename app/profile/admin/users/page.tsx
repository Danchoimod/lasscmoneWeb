"use client";

import { useEffect, useState } from "react";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import { ChevronRight, Trash2, Edit2, Plus } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface User {
    id: number;
    username: string;
    email: string;
    status: number;
    createdAt: string;
}

const STATUS_LABELS: Record<number, { label: string; color: string }> = {
    0: { label: "Banned", color: "bg-red-50 text-red-600" },
    1: { label: "Active", color: "bg-green-50 text-green-600" },
    2: { label: "Pending", color: "bg-yellow-50 text-yellow-600" },
    4: { label: "Admin", color: "bg-blue-50 text-blue-600" },
};

export default function UserPage() {
    const { data: session } = useSession();
    const token = (session as any)?.accessToken;
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (token) fetchUsers(page);
    }, [token, page]);

    const fetchUsers = async (p: number) => {
        setLoading(true);
        try {
            const res = await fetch(`/api-backend/admin/users?page=${p}&limit=20`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const json = await res.json();
            if (json.data) {
                setUsers(json.data);
                setTotalPages(json.totalPages || 1);
                setTotal(json.total || 0);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete user?")) return;
        try {
            const res = await fetch(`/api-backend/admin/users/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) fetchUsers(page);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <MainLayout><div className="p-8 text-gray-400 font-medium">Loading users...</div></MainLayout>;

    return (
        <MainLayout>
            <div className="flex items-center text-xs text-gray-400 mb-6">
                <span>Control Panel</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-gray-600 font-medium">Users</span>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-base font-bold text-gray-800 uppercase tracking-tight">Users Management</h1>
                        <p className="text-[10px] text-gray-400 mt-0.5">{total} total users</p>
                    </div>
                    <Link href="/profile/admin/users/new" className="bg-indigo-600 text-white px-4 py-2 rounded text-[10px] font-bold uppercase hover:bg-indigo-700 flex items-center shadow-sm">
                        <Plus size={14} className="mr-2" /> New User
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-[#f9f9f9] text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 text-left border-b border-gray-100">User</th>
                                <th className="px-6 py-4 text-left border-b border-gray-100">Email</th>
                                <th className="px-6 py-4 text-left border-b border-gray-100">Status</th>
                                <th className="px-6 py-4 text-left border-b border-gray-100">Join Date</th>
                                <th className="px-6 py-4 text-right border-b border-gray-100">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50 text-xs text-gray-600">
                            {users.map((u) => {
                                const statusInfo = STATUS_LABELS[u.status] || { label: `Status ${u.status}`, color: "bg-gray-50 text-gray-500" };
                                return (
                                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-800 tracking-tight">{u.username}</td>
                                        <td className="px-6 py-4">{u.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${statusInfo.color}`}>
                                                {statusInfo.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-[10px] font-medium">
                                            {new Date(u.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-4">
                                            <Link href={`/profile/admin/users/${u.id}/edit`} className="text-indigo-600 hover:text-indigo-900 font-bold uppercase text-[10px] tracking-wider">
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDelete(u.id)} className="text-red-500 hover:text-red-700 font-bold uppercase text-[10px] tracking-wider">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {users.length === 0 && (
                                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400 font-medium text-[10px]">No users found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-2">
                        <p className="text-[10px] text-gray-400 font-medium">
                            Page {page} of {totalPages}
                        </p>
                        <div className="flex gap-1">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                                className="px-3 py-1.5 text-[10px] font-bold rounded uppercase tracking-wider bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
                                Prev
                            </button>
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const start = Math.max(1, page - 2);
                                return start + i;
                            }).filter(p => p <= totalPages).map(p => (
                                <button key={p} onClick={() => setPage(p)}
                                    className={`px-3 py-1.5 text-[10px] font-bold rounded uppercase tracking-wider ${p === page ? "bg-indigo-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                                    {p}
                                </button>
                            ))}
                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                                className="px-3 py-1.5 text-[10px] font-bold rounded uppercase tracking-wider bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
