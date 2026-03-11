'use client';

import React, { ReactNode, useState } from 'react';
import { updateProfile } from '@/lib/actions';
import Toast, { ToastType } from '@/components/common/Notification';
import { signOut } from 'next-auth/react';
import { showPrompt } from '@/lib/swal';

import { User2, Camera, Save, LogOut } from 'lucide-react';
import SkinPreview from '@/components/features/profile/SkinPreview';

// --- Small components for re-use ---

const FieldLabel = ({ children }: { children: ReactNode }) => (
    <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
        {children}
    </label>
);

const SimpleInput = ({ label, value, onChange, disabled, placeholder }: any) => (
    <div className="w-full">
        <FieldLabel>{label}</FieldLabel>
        <input
            value={value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border border-gray-200 rounded-none text-sm focus:ring-1 focus:ring-green-500 outline-none transition-all ${disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'hover:border-gray-300'}`}
        />
    </div>
);

export default function ProfileClient({ initialData }: { initialData: any }) {
    const [userData, setUserData] = useState<any>(initialData);
    const [profileForm, setProfileForm] = useState({
        displayName: initialData?.displayName || '',
        username: initialData?.username || '',
        avatarUrl: initialData?.avatarUrl || '',
        skinUrl: initialData?.skinUrl || ''
    });
    const [skinModel, setSkinModel] = useState<'steve' | 'alex'>(initialData?.skinModel || 'steve');
    const [saving, setSaving] = useState(false);
    const [notification, setNotification] = useState<{ isVisible: boolean; message: string; type: ToastType }>({
        isVisible: false, message: "", type: "info",
    });

    const handleSave = async () => {
        setSaving(true);
        try {
            const result = await updateProfile(profileForm);
            if (result.success) {
                setUserData({ ...userData, ...result.data });
                setNotification({ isVisible: true, message: "Updated successfully", type: "success" });
            } else {
                setNotification({ isVisible: true, message: result.error || "Error", type: "error" });
            }
        } catch (err) {
            setNotification({ isVisible: true, message: "System error", type: "error" });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-10 px-4">
            {/* Simple Header */}
            <div className="flex justify-between items-end mb-8 border-b pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage account information and characters</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Left column: Avatar & Skin */}
                <div className="space-y-8">
                    <div className="flex flex-col items-center">
                        <FieldLabel>Avatar</FieldLabel>
                        <div className="relative group mt-2">
                            <div className="w-32 h-32 border-2 border-gray-100 overflow-hidden bg-gray-50">
                                {profileForm.avatarUrl ? (
                                    <img src={profileForm.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300"><User2 size={40} /></div>
                                )}
                            </div>
                            <button
                                onClick={async () => {
                                    const url = await showPrompt("Update Avatar", "Enter image link:");
                                    if (url !== null && url !== undefined) setProfileForm({ ...profileForm, avatarUrl: url });
                                }}
                                className="absolute bottom-1 right-1 bg-white border border-gray-200 p-2 shadow-sm hover:bg-gray-50 transition-colors"
                            >
                                <Camera size={16} className="text-gray-600" />
                            </button>
                        </div>
                    </div>

                    <div className="border border-gray-100 p-4 bg-gray-50/50">
                        <FieldLabel>Skin Preview</FieldLabel>
                        <div className="aspect-[3/4] flex items-center justify-center bg-white border border-gray-100 mb-4 overflow-hidden">
                            {profileForm.skinUrl ? (
                                <SkinPreview skinUrl={profileForm.skinUrl} model={skinModel} />
                            ) : (
                                <span className="text-xs text-gray-400 italic">No Skin</span>
                            )}
                        </div>
                        <div className="flex bg-gray-200/50 p-1">
                            {(['steve', 'alex'] as const).map((m) => (
                                <button
                                    key={m}
                                    onClick={() => setSkinModel(m)}
                                    className={`flex-1 py-1.5 text-xs font-medium capitalize transition-all ${skinModel === m ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right column: Input Form */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white border border-gray-200 p-6 space-y-5">
                        <h3 className="text-sm font-bold text-gray-800 border-b pb-3 mb-2">Basic Information</h3>

                        <SimpleInput
                            label="Username"
                            value={profileForm.username}
                            disabled
                        />

                        <SimpleInput
                            label="Display Name"
                            value={profileForm.displayName}
                            onChange={(val: string) => setProfileForm({ ...profileForm, displayName: val })}
                            placeholder="Enter the name you want to display..."
                        />

                        <SimpleInput
                            label="Email Address"
                            value={userData?.email}
                            disabled
                        />
                    </div>

                    <div className="bg-white border border-gray-200 p-6 space-y-5">
                        <h3 className="text-sm font-bold text-gray-800 border-b pb-3 mb-2">Character Customization</h3>

                        <SimpleInput
                            label="Minecraft Skin Link (.png)"
                            value={profileForm.skinUrl}
                            onChange={(val: string) => setProfileForm({ ...profileForm, skinUrl: val })}
                            placeholder="https://skin-image-link.png"
                        />
                        <p className="text-[11px] text-gray-400 leading-relaxed italic">
                            * Note: Use direct links from Imgur or photo upload pages for the most stable Skin display.
                        </p>
                    </div>

                    {/* Save button at bottom */}
                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-8 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-all shadow-sm disabled:opacity-50"
                        >
                            <Save size={16} />
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
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