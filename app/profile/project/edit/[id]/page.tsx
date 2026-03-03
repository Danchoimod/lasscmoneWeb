'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getMyPackageById, updateProject } from '@/lib/actions';
import { getCategories, getVersions } from '@/lib/api';
import Toast, { ToastType } from '@/components/common/Notification';
import { Trash2, Plus, Link as LinkIcon, Image as ImageIcon, ExternalLink } from 'lucide-react';

// Section Heading component for consistency
const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="mb-6 border-b border-[#EEE] pb-2">
        <h3 className="text-sm font-bold text-[#555] uppercase tracking-wider">{title}</h3>
        {subtitle && <p className="text-[11px] text-[#999] mt-1 italic">{subtitle}</p>}
    </div>
);

// Form Item wrapper
const FormItem = ({ label, children, description }: { label: string; children: React.ReactNode; description?: string }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-[#666]">{label}</label>
        {children}
        {description && <p className="text-[10px] text-[#999] italic">{description}</p>}
    </div>
);

const PLATFORM_MAPPING: Record<string | number, string> = {
    "1": "Bedrock",
    "2": "Java",
    "bedrock": "Bedrock",
    "java": "Java"
};

const getPlatformName = (type: string | number) => PLATFORM_MAPPING[type] || type.toString();

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [availableVersions, setAvailableVersions] = useState<any[]>([]);
    const [isAddingVersion, setIsAddingVersion] = useState(false);
    const [selectedVersionId, setSelectedVersionId] = useState('');

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

    const [formData, setFormData] = useState({
        title: '',
        shortSummary: '',
        description: '',
        catId: '',
        status: 0,
        changelog: '',
    });

    const [images, setImages] = useState<any[]>([]);
    const [urls, setUrls] = useState<any[]>([]);
    const [versions, setVersions] = useState<any[]>([]);

    useEffect(() => {
        const loadPageData = async () => {
            if (!id) return;
            try {
                setLoading(true);

                // Fetch project, categories and available versions in parallel
                const [projectResult, categoriesList, versionsList] = await Promise.all([
                    getMyPackageById(id),
                    getCategories(),
                    getVersions()
                ]);

                if (projectResult.success) {
                    const pkg = projectResult.data;
                    setFormData({
                        title: pkg.title || '',
                        shortSummary: pkg.shortSummary || '',
                        description: pkg.description || '',
                        catId: pkg.catId?.toString() || '',
                        status: pkg.status || 0,
                        changelog: pkg.changelog || '',
                    });
                    setImages(pkg.images || []);
                    setUrls(pkg.urls || []);
                    setVersions(pkg.versions || []);
                } else {
                    setError(projectResult.error || "Failed to load project");
                }

                setCategories(categoriesList || []);
                setAvailableVersions(versionsList || []);
            } catch (err) {
                setError("An error occurred while loading project data");
            } finally {
                setLoading(false);
            }
        };

        loadPageData();
    }, [id]);

    const handleSave = async () => {
        try {
            setSubmitting(true);
            const payload = {
                ...formData,
                images: images.map(img => typeof img === 'string' ? img : img.url),
                urls: urls.map(u => ({ name: u.name, url: u.url })),
                versions: versions.map(v => ({
                    id: v.id,
                    platformType: v.platformType.toString(),
                    versionNumber: v.name || v.versionNumber
                }))
            };
            const result = await updateProject(id, payload);
            if (result.success) {
                showNotification("Project updated successfully!", "success");
                setTimeout(() => {
                    router.push('/profile/project');
                }, 1500);
            } else {
                showNotification(result.error || "Failed to update project", "error");
            }
        } catch (err) {
            showNotification("An error occurred while saving", "error");
        } finally {
            setSubmitting(false);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleAddImage = () => {
        const url = prompt("Enter Image URL:");
        if (url) {
            setImages([...images, { url }]);
        }
    };

    const handleAddUrl = () => {
        const name = prompt("Enter Link Name (e.g. Mediafire):");
        const url = prompt("Enter Download URL:");
        if (name && url) {
            setUrls([...urls, { name, url }]);
        }
    };

    const handleRemoveUrl = (index: number) => {
        setUrls(urls.filter((_, i) => i !== index));
    };

    const handleAddVersion = () => {
        if (!selectedVersionId) return;

        const ver = availableVersions.find(v => v.id.toString() === selectedVersionId);
        if (ver && !versions.find(v => v.id === ver.id)) {
            setVersions([...versions, {
                ...ver,
                platformType: ver.platformType || "1",
                versionNumber: ver.name || ver.versionNumber
            }]);
            setSelectedVersionId('');
            setIsAddingVersion(false);
        } else if (ver) {
            showNotification("This version is already added", "info");
        }
    };

    const handleRemoveVersion = (index: number) => {
        setVersions(versions.filter((_, i) => i !== index));
    };

    if (loading) {
        return (
            <div className="bg-[#E9ECEF] min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#E9ECEF] min-h-screen flex flex-col justify-center items-center py-12 px-4">
                <div className="bg-white border border-[#D1D4D7] p-10 max-w-lg w-full text-center">
                    <p className="text-red-500 font-bold mb-6 italic">{error}</p>
                    <button
                        onClick={() => router.push('/profile/project')}
                        className="bg-[#333] text-white px-8 py-2 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors"
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#E9ECEF] font-sans text-[#333] min-h-screen">
            <main className="mx-auto flex w-full max-w-[1100px] flex-grow flex-col gap-6 px-4 py-8">
                {/* Header Action Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white border border-[#D1D4D7] p-4 gap-4">
                    <div>
                        <h1 className="text-lg font-bold text-[#333] uppercase">Edit Project</h1>
                        <p className="text-[10px] text-[#999] uppercase tracking-wider font-medium">ID: {id}</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => router.back()}
                            className="px-6 py-2 border border-[#D1D4D7] text-[11px] font-bold uppercase tracking-wider hover:bg-[#F8F9FA] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={submitting}
                            className={`px-8 py-2 bg-[#4CAF50] text-white border border-[#45a049] text-[11px] font-bold uppercase tracking-wider hover:bg-[#45a049] transition-colors ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {submitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                {/* Main Content Container */}
                <div className="bg-white border border-[#D1D4D7] overflow-hidden">
                    <div className="p-6 sm:p-10 space-y-12">

                        {/* 01. General Section */}
                        <section>
                            <SectionHeader title="01. General Information" subtitle="Basic details about your project" />
                            <div className="grid grid-cols-1 gap-6">
                                <FormItem label="Project Name" description="Do not include tags like [MOD] in the title.">
                                    <input
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full border border-[#D1D4D7] bg-[#FDFDFD] p-2.5 text-sm outline-none focus:border-[#BBB] transition-colors"
                                        placeholder="e.g. My Awesome Mod"
                                    />
                                </FormItem>
                                <FormItem label="Summary" description="A brief overview that appears in search results.">
                                    <input
                                        value={formData.shortSummary}
                                        onChange={(e) => setFormData({ ...formData, shortSummary: e.target.value })}
                                        className="w-full border border-[#D1D4D7] bg-[#FDFDFD] p-2.5 text-sm outline-none focus:border-[#BBB] transition-colors"
                                        placeholder="Describe your project in a few words..."
                                    />
                                </FormItem>
                            </div>
                        </section>

                        {/* 02. Category & Status */}
                        <section>
                            <SectionHeader title="02. Category & Status" subtitle="Select where your project belongs" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormItem label="Primary Category">
                                    <select
                                        value={formData.catId}
                                        onChange={(e) => setFormData({ ...formData, catId: e.target.value })}
                                        className="w-full border border-[#D1D4D7] bg-[#FDFDFD] p-2.5 text-sm outline-none focus:border-[#BBB]"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((cat: any) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </FormItem>
                                <FormItem label="Status" description="Managed by site administrators.">
                                    <select
                                        value={formData.status}
                                        disabled
                                        className="w-full border border-[#D1D4D7] bg-[#F5F5F5] p-2.5 text-sm outline-none text-[#999] italic cursor-not-allowed"
                                    >
                                        <option value={0}>Pending</option>
                                        <option value={1}>Published</option>
                                        <option value={2}>Under Review</option>
                                    </select>
                                </FormItem>
                            </div>
                        </section>

                        {/* 03. Gallery Section */}
                        <section>
                            <SectionHeader title="03. Project Gallery" subtitle="Max 5 images. First image is the cover." />
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                {images.map((img, index) => (
                                    <div key={img.id || index} className="aspect-video relative group border border-[#EEE] bg-gray-50 overflow-hidden">
                                        <img src={img.url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                onClick={() => handleRemoveImage(index)}
                                                className="p-1.5 bg-red-600 text-white hover:bg-red-700 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        {index === 0 && (
                                            <div className="absolute top-0 left-0 bg-[#4CAF50] text-white text-[9px] font-bold px-1.5 py-0.5 uppercase">
                                                Cover
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {images.length < 5 && (
                                    <button
                                        onClick={handleAddImage}
                                        className="aspect-video border border-dashed border-[#BBB] bg-[#FDFDFD] flex flex-col items-center justify-center hover:bg-[#F8F9FA] hover:border-[#999] transition-colors group"
                                    >
                                        <Plus size={18} className="text-[#999]" />
                                        <span className="text-[9px] font-bold text-[#999] uppercase mt-1">Add Image</span>
                                    </button>
                                )}
                            </div>
                        </section>

                        {/* 04. Download Links Section */}
                        <section>
                            <SectionHeader title="04. Download Links" subtitle="External mirrors and download locations" />
                            <div className="space-y-4">
                                {urls.length === 0 ? (
                                    <div className="p-10 border border-dashed border-[#D1D4D7] text-center bg-[#FDFDFD]">
                                        <p className="text-xs text-[#999] italic">No download links added yet.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-2">
                                        {urls.map((u, index) => (
                                            <div key={u.id || index} className="flex items-center gap-4 border border-[#EEE] p-3 bg-[#FDFDFD] hover:bg-[#F8F9FA] transition-colors">
                                                <div className="w-8 h-8 bg-blue-50 flex items-center justify-center shrink-0">
                                                    <LinkIcon size={16} className="text-blue-500" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-[#555] uppercase tracking-tight">{u.name}</span>
                                                        <a href={u.url} target="_blank" rel="noopener noreferrer" className="text-[#BBB] hover:text-blue-500 transition-colors">
                                                            <ExternalLink size={11} />
                                                        </a>
                                                    </div>
                                                    <div className="text-[10px] text-[#AAA] truncate font-mono">{u.url}</div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveUrl(index)}
                                                    className="text-[10px] font-bold uppercase text-red-500 hover:text-red-700 px-2"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <button
                                    onClick={handleAddUrl}
                                    className="flex items-center gap-2 text-[11px] font-bold uppercase text-blue-600 border border-blue-100 bg-blue-50 px-4 py-2 hover:bg-blue-100 transition-colors"
                                >
                                    <Plus size={14} />
                                    Add Link
                                </button>
                            </div>
                        </section>

                        {/* 05. Minecraft Versions Section */}
                        <section>
                            <SectionHeader title="05. Minecraft Versions" subtitle="What versions are supported?" />
                            <div className="space-y-4">
                                {versions.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                        {versions.map((v, index) => (
                                            <div key={v.id || index} className="flex items-center gap-3 border border-[#EEE] p-2.5 bg-[#FDFDFD] hover:bg-[#F8F9FA] transition-colors">
                                                <div className="w-7 h-7 bg-emerald-50 flex items-center justify-center shrink-0">
                                                    <span className="text-[9px] font-bold text-emerald-600 uppercase">
                                                        {getPlatformName(v.platformType).substring(0, 1)}
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-[11px] font-bold text-[#555] uppercase">
                                                        {getPlatformName(v.platformType)} / {v.name || v.versionNumber}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveVersion(index)}
                                                    className="text-[#BBB] hover:text-red-500 transition-colors px-1"
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {isAddingVersion ? (
                                    <div className="bg-[#F8F9FA] border border-[#D1D4D7] p-4 space-y-3 max-w-sm">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase text-[#999]">Select Version</label>
                                            <select
                                                value={selectedVersionId}
                                                onChange={(e) => setSelectedVersionId(e.target.value)}
                                                className="w-full border border-[#D1D4D7] bg-white p-2 text-xs outline-none"
                                            >
                                                <option value="">-- Select --</option>
                                                {availableVersions
                                                    .filter(av => !versions.find(v => v.id === av.id))
                                                    .map(av => (
                                                        <option key={av.id} value={av.id}>{av.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleAddVersion}
                                                disabled={!selectedVersionId}
                                                className="px-4 py-1.5 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                                            >
                                                OK
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsAddingVersion(false);
                                                    setSelectedVersionId('');
                                                }}
                                                className="px-4 py-1.5 border border-[#D1D4D7] text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsAddingVersion(true)}
                                        className="flex items-center gap-2 text-[11px] font-bold uppercase text-emerald-600 border border-emerald-100 bg-emerald-50 px-4 py-2 hover:bg-emerald-100 transition-colors"
                                    >
                                        <Plus size={14} />
                                        Add Version
                                    </button>
                                )}
                            </div>
                        </section>

                        {/* 06. Description Section */}
                        <section>
                            <SectionHeader title="06. Description" subtitle="Detailed information about your creation" />
                            <div className="space-y-6">
                                <FormItem label="Long Description">
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full min-h-[350px] border border-[#D1D4D7] bg-[#FDFDFD] p-5 text-sm outline-none focus:border-[#BBB] leading-relaxed transition-colors font-mono"
                                        placeholder="Detailed explanation..."
                                    />
                                </FormItem>

                                <FormItem label="Changelog (Optional)">
                                    <textarea
                                        value={formData.changelog}
                                        onChange={(e) => setFormData({ ...formData, changelog: e.target.value })}
                                        className="w-full min-h-[150px] border border-[#D1D4D7] bg-[#FDFDFD] p-5 text-sm outline-none focus:border-[#BBB] leading-relaxed transition-colors font-mono"
                                        placeholder="Release notes..."
                                    />
                                </FormItem>
                            </div>
                        </section>
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-[#F8F9FA] border-t border-[#EEE] p-6 flex flex-col sm:flex-row justify-end gap-3">
                        <button
                            onClick={() => router.back()}
                            className="px-8 py-3 border border-[#D1D4D7] text-[11px] font-bold uppercase tracking-wider hover:bg-white transition-colors"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={submitting}
                            className={`px-10 py-3 bg-[#333] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-black transition-colors ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {submitting ? 'Updating...' : 'Save All Changes'}
                        </button>
                    </div>
                </div>
            </main>

            <Toast
                isVisible={notification.isVisible}
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification((prev) => ({ ...prev, isVisible: false }))}
            />
        </div>
    );
}
