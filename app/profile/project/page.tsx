'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// Thành phần tiêu đề Section kiểu Classic
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-6 border-b-2 border-gray-800 pb-2">
    <h2 className="text-xl font-bold text-gray-800">{children}</h2>
  </div>
);

export default function ProjectPage() {
  const router = useRouter();

  const mockProjects = [
    { id: 1, name: 'Advanced Machinery', game: 'Minecraft', status: 'Published', date: '2024-02-10' },
    { id: 2, name: 'Magic Wands Pro', game: 'Minecraft', status: 'Draft', date: '2024-02-12' },
    { id: 3, name: 'Skyblock Extreme', game: 'Terraria', status: 'Reviewing', date: '2024-02-13' },
    { id: 4, name: 'Industrial Expansion', game: 'Minecraft', status: 'Published', date: '2024-02-14' },
  ];

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

        <div className="border border-gray-300 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="p-3 font-bold text-[9px] sm:text-[10px] uppercase text-gray-600">Project</th>
                <th className="p-3 font-bold text-[10px] uppercase text-gray-600 hidden md:table-cell">Platform</th>
                <th className="p-3 font-bold text-[10px] uppercase text-gray-600">Status</th>
                <th className="p-3 font-bold text-[10px] uppercase text-gray-600 hidden sm:table-cell">Updated</th>
                <th className="p-3 font-bold text-[9px] sm:text-[10px] uppercase text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockProjects.map(project => (
                <tr key={project.id} className="hover:bg-gray-50 group">
                  <td className="p-3">
                    <div className="font-bold text-[13px] sm:text-sm text-blue-600 hover:underline cursor-pointer truncate max-w-[120px] sm:max-w-none">{project.name}</div>
                    <div className="text-[9px] text-gray-400 md:hidden uppercase font-bold">{project.game}</div>
                  </td>
                  <td className="p-3 text-xs font-medium text-gray-600 hidden md:table-cell">{project.game}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${project.status === 'Published' ? 'bg-green-50 text-green-700 border-green-200' :
                      project.status === 'Draft' ? 'bg-gray-50 text-gray-600 border-gray-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500 text-[10px] sm:text-[11px] font-medium hidden sm:table-cell">{project.date}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}