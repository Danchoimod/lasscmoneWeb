import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import CarouselForm from "@/components/carousels/CarouselForm";
import { ChevronRight } from "lucide-react";

export default function NewCarouselPage() {
    return (
        <MainLayout>
            <div className="flex items-center text-xs text-gray-400 mb-6">
                <span>Control Panel</span>
                <ChevronRight size={12} className="mx-1" />
                <span>Carousels</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-gray-600 font-medium">New Carousel</span>
            </div>

            <CarouselForm />
        </MainLayout>
    );
}
