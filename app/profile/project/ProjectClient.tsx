'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { deleteProject } from '@/lib/actions';
import { showAlert, showConfirm } from '@/lib/swal';


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

import Pagination from '@/components/common/Pagination';

export default function ProjectClient({
    initialProjects,
    initialPagination
}: {
    initialProjects: Project[],
    initialPagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    } | null
}) {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [pagination, setPagination] = useState(initialPagination);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [isFetching, setIsFetching] = useState(false);

    const onPageChange = async (pageNum: number) => {
        if (!pagination || isFetching) return;

        setIsFetching(true);
        try {
            const { getMyPackages } = await import("@/lib/actions");
            const result = await getMyPackages(pageNum);

            if (result.success) {
                setProjects(result.data);
                setPagination(result.pagination);

                // Scroll to list start
                const containerElement = document.getElementById('project-list-container');
                if (containerElement) {
                    containerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        } catch (err) {
            console.error("Failed to load page:", err);
        } finally {
            setIsFetching(false);
        }
    };

    const handleDelete = async (id: number, title: string) => {
        const confirmed = await showConfirm(
            "Delete Project",
            `Are you sure you want to delete "${title}"? This action will permanently remove the project and all associated data.`
        );
        if (!confirmed) return;

        setIsDeleting(id);
        try {
            const result = await deleteProject(id);
            if (result.success) {
                setProjects((prev) => prev.filter(p => p.id !== id));
            } else {
                await showAlert("Error", result.error || "Failed to delete project", "error");
            }
        } catch (error) {
            console.error("Delete error:", error);
            await showAlert("Error", "An error occurred while deleting the project", "error");
        } finally {
            setIsDeleting(null);
        }
    };

    return (
        <div className="bg-white p-3 sm:p-8 border border-gray-300 transition-none min-h-screen rounded-none animate-in fade-in duration-500">
            <SectionHeading>Create & Manage Projects</SectionHeading>

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-xs sm:text-sm font-bold uppercase text-gray-700">My Existing Projects</h3>
                    <button
                        onClick={() => router.push('/profile/project/create')}
                        className="w-full sm:w-auto bg-green-600 text-white px-4 py-2.5 text-[10px] font-bold uppercase hover:bg-green-700 transition-none rounded-none border border-green-700 shadow-sm"
                    >
                        + Create New Project
                    </button>
                </div>

                {projects.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 border border-dashed border-gray-300">
                        <p className="text-gray-400 italic text-sm">You haven't created any projects yet.</p>
                    </div>
                ) : (
                    <>
                        <div id="project-list-container" className={`relative min-h-[400px] transition-all duration-300 ${isFetching ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                            {/* Desktop View Table */}
                            <div id="project-table" className="hidden sm:block border border-gray-300">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-300">
                                            <th className="p-3 font-bold text-[10px] uppercase text-gray-600">Project</th>
                                            <th className="p-3 font-bold text-[10px] uppercase text-gray-600">Status</th>
                                            <th className="p-3 font-bold text-[10px] uppercase text-gray-600">Created At</th>
                                            <th className="p-3 font-bold text-[10px] uppercase text-gray-600 text-right">Actions</th>
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
                                                            className="font-bold text-sm text-blue-600 hover:underline cursor-pointer"
                                                        >
                                                            {project.title}
                                                        </Link>
                                                    </td>
                                                    <td className="p-3">
                                                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${statusInfo.class}`}>
                                                            {statusInfo.label}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 text-gray-500 text-[11px] font-medium">
                                                        {new Date(project.createdAt).toLocaleDateString("en-GB", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                    </td>
                                                    <td className="p-3 text-right">
                                                        <div className="flex justify-end gap-3 text-xs">
                                                            <button
                                                                onClick={() => router.push(`/profile/project/edit/${project.id}`)}
                                                                className="font-bold uppercase text-gray-500 hover:text-gray-800"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(project.id, project.title)}
                                                                disabled={isDeleting === project.id}
                                                                className={`font-bold uppercase ${isDeleting === project.id ? 'text-gray-400' : 'text-red-500 hover:text-red-700'}`}
                                                            >
                                                                {isDeleting === project.id ? 'Deleting...' : 'Delete'}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile View Cards */}
                            <div className="sm:hidden space-y-4">
                                {projects.map(project => {
                                    const statusInfo = getStatusLabel(project.status);
                                    return (
                                        <div key={project.id} className="border border-gray-300 p-4 bg-white hover:border-gray-400 transition-colors">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex-1 min-w-0 pr-2">
                                                    <Link
                                                        href={`/project/${project.slug}`}
                                                        className="font-bold text-base text-blue-600 hover:underline block truncate"
                                                    >
                                                        {project.title}
                                                    </Link>
                                                    <p className="text-[10px] text-gray-500 mt-1 uppercase font-medium">
                                                        Created: {new Date(project.createdAt).toLocaleDateString("en-GB", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                    </p>
                                                </div>
                                                <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border shrink-0 ${statusInfo.class}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </div>

                                            <div className="flex border-t border-gray-100 pt-3 mt-3 gap-4">
                                                <button
                                                    onClick={() => router.push(`/profile/project/edit/${project.id}`)}
                                                    className="flex-1 text-center py-2 text-[10px] font-bold uppercase text-gray-700 bg-gray-50 border border-gray-200 active:bg-gray-100"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(project.id, project.title)}
                                                    disabled={isDeleting === project.id}
                                                    className={`flex-1 text-center py-2 text-[10px] font-bold uppercase border ${isDeleting === project.id
                                                        ? 'text-gray-400 bg-gray-50 border-gray-100'
                                                        : 'text-red-600 bg-red-50 border-red-100 active:bg-red-100'
                                                        }`}
                                                >
                                                    {isDeleting === project.id ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {pagination && pagination.totalPages > 1 && (
                            <Pagination
                                currentPage={pagination.page}
                                totalPages={pagination.totalPages}
                                onPageChange={onPageChange}
                                isLoading={isFetching}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
