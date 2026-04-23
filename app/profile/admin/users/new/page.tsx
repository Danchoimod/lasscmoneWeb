import { MainLayout } from '@/app/profile/admin/layouts/MainLayout';
import UserForm from "@/components/users/UserForm";
import { ChevronRight } from "lucide-react";

export default function NewUserPage() {
    return (
        <MainLayout>
            <div className="flex items-center text-xs text-gray-400 mb-6">
                <span>Control Panel</span>
                <ChevronRight size={12} className="mx-1" />
                <span>Users</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-gray-600 font-medium">New User</span>
            </div>

            <UserForm />
        </MainLayout>
    );
}
