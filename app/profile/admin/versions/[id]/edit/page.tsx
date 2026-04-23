"use client";

import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import { ChevronRight } from "lucide-react";
import VersionForm from '@/components/versions/VersionForm';
import { useParams } from "next/navigation";

export default function EditVersionPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <MainLayout>
      <div className="flex items-center text-xs text-gray-400 mb-6 font-bold uppercase tracking-tight">
        <span>Control Panel</span>
        <ChevronRight size={12} className="mx-1" />
        <span>Versions</span>
        <ChevronRight size={12} className="mx-1" />
        <span className="text-gray-600 font-medium tracking-normal">Edit Version</span>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
          <h1 className="text-base font-bold text-gray-800 uppercase tracking-tight">Edit Version #{id}</h1>
        </div>
        <VersionForm id={id} />
      </div>
    </MainLayout>
  );
}
