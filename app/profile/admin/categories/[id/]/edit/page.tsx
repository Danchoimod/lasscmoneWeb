"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import CategoryForm from "@/components/categories/CategoryForm";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";

export default function EditCategoryPage() {
    const params = useParams();
    const { data: session } = useSession();
    const token = (session as any)?.accessToken;
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategory() {
            if (!token) return;
            try {
                const id = params.id;
                const res = await fetch(`/api-backend/admin/categories/${id}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
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
        if (params.id && token) fetchCategory();
    }, [params.id, token]);

    if (loading) return <MainLayout><div className="p-8 text-gray-400 font-medium italic">Loading category metadata...</div></MainLayout>;
    if (!initialData) return <MainLayout><div className="p-8 text-red-500 font-bold uppercase tracking-widest text-xs">Category not found.</div></MainLayout>;

    return (
        <MainLayout>
            <div className="flex items-center text-xs text-gray-400 mb-6">
                <span>Control Panel</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="font-medium">Categories</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-gray-600 font-bold tracking-tight">Edit Category</span>
            </div>

            <CategoryForm initialData={initialData} isEdit={true} />
        </MainLayout>
    );
}
