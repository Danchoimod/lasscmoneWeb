"use client";

import { useEffect, useState } from "react";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import { ChevronRight, Trash2, Flag, ExternalLink } from "lucide-react";

interface Report {
    id: number;
    reason: string;
    createdAt: string;
    user: { username: string };
    targetUser?: { username: string };
    package?: { title: string };
}

import { useSession } from "next-auth/react";

export default function ReportPage() {
    const { data: session } = useSession();
    const token = (session as any)?.accessToken;
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            fetchReports();
        }
    }, [token]);

    const fetchReports = async () => {
        try {
            const res = await fetch("/api-backend/admin/reports?limit=100", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const json = await res.json();
            if (json.data) setReports(json.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this report?")) return;
        try {
            const res = await fetch(`/api-backend/admin/reports/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) fetchReports();
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
                <span className="text-gray-600 font-medium">Reports</span>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 font-bold text-gray-800 uppercase tracking-tight">
                    Reports Management
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-[#f9f9f9] text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 text-left border-b border-gray-100">Reason</th>
                                <th className="px-6 py-4 text-left border-b border-gray-100">Reporter</th>
                                <th className="px-6 py-4 text-left border-b border-gray-100">Target (User/Pkg)</th>
                                <th className="px-6 py-4 text-left border-b border-gray-100">Date</th>
                                <th className="px-6 py-4 text-right border-b border-gray-100">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50 text-xs text-gray-600">
                            {reports.map((r) => (
                                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-gray-800 font-bold">{r.reason}</td>
                                    <td className="px-6 py-4 font-medium">{r.user?.username || 'Unknown'}</td>
                                    <td className="px-6 py-4">
                                        {r.targetUser ? (
                                            <span className="text-blue-600 font-bold uppercase text-[10px]">User: {r.targetUser?.username || 'N/A'}</span>
                                        ) : r.package ? (
                                            <span className="text-indigo-600 font-bold uppercase text-[10px]">Pkg: {r.package?.title || 'N/A'}</span>
                                        ) : <span className="text-gray-300">N/A</span>}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-[10px] font-bold uppercase">{new Date(r.createdAt).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:text-red-700 font-bold uppercase text-[10px] tracking-wider">
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
