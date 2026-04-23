"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import CarouselForm from "@/components/carousels/CarouselForm";
import { ChevronRight } from "lucide-react";

export default function EditCarouselPage() {
    const { data: session } = useSession();
    const token = (session as any)?.accessToken;
    const params = useParams();
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchItem() {
            try {
                const id = params.id;
                const res = await fetch(`/api-backend/admin/carousels/${id}`, {
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
        if (params.id && token) fetchItem();
    }, [params.id, token]);

    if (loading) return <MainLayout><div className="p-8">Loading carousel data...</div></MainLayout>;
    if (!initialData) return <MainLayout><div className="p-8">Item not found.</div></MainLayout>;

    return (
        <MainLayout>
            <div className="flex items-center text-xs text-gray-400 mb-6">
                <span>Control Panel</span>
                <ChevronRight size={12} className="mx-1" />
                <span>Carousels</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-gray-600 font-medium">Edit Carousel</span>
            </div>

            <CarouselForm initialData={initialData} isEdit={true} />
        </MainLayout>
    );
}
