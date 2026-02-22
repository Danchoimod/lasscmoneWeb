'use client';

import React, { ReactNode, useState, useEffect, useCallback } from 'react';
import { getMe } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import Toast, { ToastType } from '@/components/common/Notification';
import { useSession, signOut } from 'next-auth/react';

// 1. Định nghĩa Interface cho Props
interface SectionHeadingProps {
  children: ReactNode;
}

// 2. Sử dụng Interface trong Component
const SectionHeading = ({ children }: SectionHeadingProps) => (
  <div className="mb-8 border-b-2 border-gray-800 pb-2">
    <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight italic">{children}</h2>
  </div>
);

interface ClassicInputProps {
  label: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
}

const ClassicInput = ({ label, type = "text", value, placeholder, onChange, disabled }: ClassicInputProps) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
      {label}
    </label>
    <input
      type={type}
      value={value || ""}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      className={`px-4 py-3 border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-green-600 outline-none transition-all duration-300 font-medium ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    />
  </div>
);

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Notification state
  const [notification, setNotification] = useState<{
    isVisible: boolean;
    message: string;
    type: ToastType;
  }>({
    isVisible: false,
    message: "",
    type: "info",
  });

  const showNotification = (message: string, type: ToastType = "info") => {
    setNotification({ isVisible: true, message, type });
  };

  const handleLogout = useCallback(async () => {
    // 1. Hiện thông báo
    showNotification("Session ended. Redirecting...", "warning");

    // 2. Clear session using Auth.js
    await signOut({ callbackUrl: '/login' });
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const result = await getMe();
        if (result.success) {
          setUserData(result.data);
        } else {
          // Bắt lỗi 401 -> Gọi hàm handleLogout()
          if (result.isUnauthorized) {
            handleLogout();
            return;
          }
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [handleLogout]);

  // Handle saving profile with notification
  const handleSave = () => {
    showNotification("Thông tin tài khoản đã được cập nhật thành công!", "success");
  };

  if (loading) {
    return (
      <div className="bg-white p-20 flex justify-center items-center h-full border border-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-12 border border-gray-200 text-center">
        <p className="text-red-500 font-bold mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-gray-800 text-white px-6 py-2 text-xs font-bold uppercase tracking-widest"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-8 border border-gray-200 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-10">
        <SectionHeading>Account Settings</SectionHeading>
        <div className="flex gap-6 w-full sm:w-auto justify-center sm:justify-start bg-gray-50 sm:bg-transparent p-4 sm:p-0 border border-gray-100 sm:border-none">
          <div className="text-center">
            <span className="block text-xl font-black text-zinc-900">{userData?._count?.followers || 0}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Followers</span>
          </div>
          <div className="text-center">
            <span className="block text-xl font-black text-zinc-900">{userData?._count?.following || 0}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Following</span>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          <div className="flex flex-col gap-3 group shrink-0">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Avatar</label>
            <div className="relative w-32 h-32 border-2 border-gray-100 bg-gray-50 flex items-center justify-center cursor-pointer hover:border-green-600 transition-all duration-300 overflow-hidden shadow-inner">
              {userData?.avatarUrl ? (
                <img src={userData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 font-bold text-[10px] uppercase">No Image</span>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white font-bold text-[10px] uppercase tracking-widest">Change</span>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-2 py-4">
            <h3 className="text-2xl font-black text-zinc-900 tracking-tight break-all">{userData?.displayName || userData?.username}</h3>
            <p className="text-sm text-gray-500 italic">User ID: #{userData?.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl">
          <ClassicInput label="Username" value={userData?.username} disabled />
          <ClassicInput label="Display Name" value={userData?.displayName} />
          <div className="md:col-span-2">
            <ClassicInput label="Email Address" type="email" value={userData?.email} />
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleSave}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-10 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:translate-y-[-2px] active:translate-y-[0] shadow-md shadow-green-100"
          >
            Save Changes
          </button>
          <button className="w-full sm:w-auto bg-gray-50 hover:bg-gray-100 text-gray-500 px-10 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all">
            Cancel
          </button>
        </div>
      </div>

      <Toast
        isVisible={notification.isVisible}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}
