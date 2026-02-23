'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMyPackages } from '@/lib/actions';
import Link from 'next/link';

// Thành phần tiêu đề Section kiểu Classic
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-6 border-b-2 border-gray-800 pb-2">
    <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight italic">{children}</h2>
  </div>
);

interface Project {
  id: number;
  title: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export default function ProjectPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const result = await getMyPackages();
        if (result.success) {
          setProjects(result.data || []);
        } else {
          setError(result.error || "Failed to load projects");
        }
      } catch (err) {
        setError("An error occurred while fetching projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 1:
        return { label: 'Published', class: 'bg-green-50 text-green-700 border-green-200' };
      case 2:
        return { label: 'Rejected', class: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 0:
      default:
        return { label: 'Pending', class: 'bg-gray-50 text-gray-600 border-gray-200' };
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-20 flex justify-center items-center h-full border border-gray-300">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-3 sm:p-8 border border-gray-300 transition-none min-h-screen rounded-none">
      <SectionHeading>Create & Manage Projects</SectionHeading>

      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-xs sm:text-sm font-bold uppercase text-gray-700">My Existing Projects</h3>
          <button
            onClick={() => router.push('/profile/project/create')}
            className="w-full sm:w-auto bg-green-600 text-white px-4 py-2.5 text-[10px] font-bold uppercase hover:bg-green-700 transition-none rounded-none border border-green-700 shadow-sm"
          >
            + Create New Project
          </button>
        </div>

        {error ? (
          <div className="text-center py-10 bg-red-50 border border-red-100 text-red-500">
            <p className="text-sm font-bold">{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 border border-dashed border-gray-300">
            <p className="text-gray-400 italic text-sm">You haven't created any projects yet.</p>
          </div>
        ) : (
          <div className="border border-gray-300 overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-300">
                  <th className="p-3 font-bold text-[9px] sm:text-[10px] uppercase text-gray-600">Project</th>
                  <th className="p-3 font-bold text-[10px] uppercase text-gray-600">Status</th>
                  <th className="p-3 font-bold text-[10px] uppercase text-gray-600 hidden sm:table-cell">Created At</th>
                  <th className="p-3 font-bold text-[9px] sm:text-[10px] uppercase text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map(project => {
                  const statusInfo = getStatusLabel(project.status);
                  return (
                    <tr key={project.id} className="hover:bg-gray-50 group">
                      <td className="p-3">
                        <Link
                          href={`/project/${project.slug}`}
                          className="font-bold text-[13px] sm:text-sm text-blue-600 hover:underline cursor-pointer truncate max-w-[200px] sm:max-w-none block"
                        >
                          {project.title}
                        </Link>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${statusInfo.class}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="p-3 text-gray-500 text-[10px] sm:text-[11px] font-medium hidden sm:table-cell">
                        {new Date(project.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => router.push(`/profile/project/edit/${project.id}`)}
                            className="text-[10px] font-bold uppercase text-gray-500 hover:text-gray-800"
                          >
                            Edit
                          </button>
                          <button className="text-[10px] font-bold uppercase text-red-500 hover:text-red-700">Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}