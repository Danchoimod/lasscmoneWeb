import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import CategoryForm from "@/components/categories/CategoryForm";
import { ChevronRight } from "lucide-react";

export default function NewCategoryPage() {
    return (
        <MainLayout>
            <div className="flex items-center text-xs text-gray-400 mb-6">
                <span>Control Panel</span>
                <ChevronRight size={12} className="mx-1" />
                <span>Categories</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-gray-600 font-medium">New Category</span>
            </div>

            <CategoryForm />
        </MainLayout>
    );
}
