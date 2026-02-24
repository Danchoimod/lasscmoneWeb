import React from 'react';
import { getMyPackages } from '@/lib/actions';
import ProjectClient from './ProjectClient';

export default async function ProjectPage() {
  const result = await getMyPackages();

  if (!result.success) {
    return (
      <div className="bg-white p-3 sm:p-8 border border-gray-300 min-h-screen text-center">
        <p className="text-red-500 font-bold mb-4">{result.error || "Failed to load projects"}</p>
        <a
          href="/profile/project"
          className="bg-gray-800 text-white px-6 py-2 text-xs font-bold uppercase tracking-widest inline-block"
        >
          Try Again
        </a>
      </div>
    );
  }

  return <ProjectClient initialProjects={result.data || []} />;
}