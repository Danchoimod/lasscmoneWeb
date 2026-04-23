"use client";

import { useEffect, useState } from "react";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import { ChevronRight, Trash2, Edit2, Plus } from "lucide-react";
import Link from "next/link";

interface User {
  id: number;
  username: string;
  email: string;
  status: number;
  createdAt: string;
}

import { useSession } from "next-auth/react";

export default function UserPage() {
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api-backend/admin/users", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete user?")) return;
    try {
      const res = await fetch(`/api-backend/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <MainLayout><div className="p-8">Loading users...</div></MainLayout>;

  return (
    <MainLayout>
      <div className="flex items-center text-xs text-gray-400 mb-6">
        <span>Control Panel</span>
        <ChevronRight size={12} className="mx-1" />
        <span className="text-gray-600 font-medium">Users</span>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h1 className="text-base font-bold text-gray-800 uppercase tracking-tight">Users Management</h1>
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
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-800 tracking-tight">{u.username}</td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${u.status === 1 ? "bg-green-50 text-green-600" :
                        u.status === 4 ? "bg-blue-50 text-blue-600" :
                          "bg-red-50 text-red-600"
                      }`}>
                      {u.status === 1 ? "Active" : u.status === 4 ? "Verified" : "Banned"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-[10px] font-medium uppercase tracking-tighter">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <Link href={`/users/${u.id}/edit`} className="text-indigo-600 hover:text-indigo-900 font-bold uppercase text-[10px] tracking-wider">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(u.id)} className="text-red-500 hover:text-red-700 font-bold uppercase text-[10px] tracking-wider">
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
