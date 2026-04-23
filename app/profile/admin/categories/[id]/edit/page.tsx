"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import CategoryForm from "@/components/categories/CategoryForm";
import { ChevronRight } from "lucide-react";

export default function EditCategoryPage() {
    const params = useParams();
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategory() {
            try {
                const id = params.id;
                const res = await fetch(`/api-backend/admin/categories/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setInitialData(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        if (params.id) fetchCategory();
    }, [params.id]);

    if (loading) return <MainLayout><div className="p-8">Loading category data...</div></MainLayout>;
    if (!initialData) return <MainLayout><div className="p-8">Category not found.</div></MainLayout>;

    return (
        <MainLayout>
            <div className="flex items-center text-xs text-gray-400 mb-6">
                <span>Control Panel</span>
                <ChevronRight size={12} className="mx-1" />
                <span>Categories</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-gray-600 font-medium">Edit Category</span>
            </div>

            <CategoryForm initialData={initialData} isEdit={true} />
        </MainLayout>
    );
}
