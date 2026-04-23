import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import PackageForm from "@/components/packages/PackageForm";
import { ChevronRight } from "lucide-react";

export default function NewPackagePage() {
    return (
        <MainLayout>
            <div className="flex items-center text-xs text-gray-400 mb-6">
                <span>Control Panel</span>
                <ChevronRight size={12} className="mx-1" />
                <span>Packages</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-gray-600 font-medium">New Package</span>
            </div>

            <PackageForm />
        </MainLayout>
    );
}
