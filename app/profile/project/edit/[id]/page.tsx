'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getMyPackageById, updateProject } from '@/lib/actions';
import { getCategories, getVersions } from '@/lib/api';
import Toast, { ToastType } from '@/components/common/Notification';
import { Trash2, Plus, Link as LinkIcon, Image as ImageIcon, ExternalLink } from 'lucide-react';

// Section Heading component for consistency
const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="mb-8 border-b-2 border-gray-800 pb-2">
        <h3 className="text-xl font-bold text-gray-800 uppercase tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-1 italic">{subtitle}</p>}
    </div>
);

// Form Item wrapper
const FormItem = ({ label, children, description }: { label: string; children: React.ReactNode; description?: string }) => (
    <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">{label}</label>
        {children}
        {description && <p className="text-[10px] text-gray-400 italic">{description}</p>}
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
                // Send version IDs if we have them, otherwise fallback to names if that's what the API expects
                // For now, mapping back to the structure the user previously showed
                versions: versions.map(v => ({
                    id: v.id,
                    platformType: v.platformType.toString(), // Keep as string but it will be "1" or "2"
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
            // platformType is already in the database/version object, no need to prompt
            setVersions([...versions, {
                ...ver,
                platformType: ver.platformType || "1", // Default to Bedrock if not specified
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
            <div className="bg-white p-20 flex justify-center items-center h-full border border-gray-100 min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-12 border border-gray-200 text-center min-h-[60vh] flex flex-col justify-center items-center">
                <p className="text-red-500 font-bold mb-4">{error}</p>
                <button
                    onClick={() => router.push('/profile/project')}
                    className="bg-gray-800 text-white px-6 py-2 text-xs font-bold uppercase tracking-widest"
                >
                    Back to Projects
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-300 shadow-sm p-4 sm:p-12 mb-12">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-10 sm:mb-12 gap-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tighter uppercase">Edit Project</h1>
                    <p className="text-[11px] sm:text-sm text-gray-400 sm:text-gray-500 font-medium mt-1 uppercase tracking-wider italic">ID: {id}</p>
                </div>
                <div className="flex w-full sm:w-auto gap-3">
                    <button
                        onClick={() => router.back()}
                        className="flex-1 sm:flex-none px-4 sm:px-6 py-2 border border-gray-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={submitting}
                        className={`flex-[2] sm:flex-none px-6 sm:px-8 py-2 bg-[#4CAF50] text-white border border-green-600 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-green-600 transition-none shadow-sm ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {submitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="space-y-16">

                {/* General Section */}
                <section>
                    <SectionHeader title="01. General Information" subtitle="Basic details about your project" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2">
                            <FormItem label="Project Name" description="Do not include tags like [MOD] in the title.">
                                <input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full border border-gray-300 bg-gray-50 p-3 text-sm outline-none focus:bg-white focus:border-gray-800 transition-none"
                                    placeholder="e.g. My Awesome Mod"
                                />
                            </FormItem>
                        </div>
                        <div className="md:col-span-2">
                            <FormItem label="Summary" description="A brief overview that appears in search results.">
                                <input
                                    value={formData.shortSummary}
                                    onChange={(e) => setFormData({ ...formData, shortSummary: e.target.value })}
                                    className="w-full border border-gray-300 bg-gray-50 p-3 text-sm outline-none focus:bg-white focus:border-gray-800 transition-none"
                                    placeholder="Describe your project in a few words..."
                                />
                            </FormItem>
                        </div>
                    </div>
                </section>

                {/* Category & Status */}
                <section>
                    <SectionHeader title="02. Category & Status" subtitle="Select where your project belongs and its current state" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormItem label="Primary Category">
                            <select
                                value={formData.catId}
                                onChange={(e) => setFormData({ ...formData, catId: e.target.value })}
                                className="w-full border border-gray-300 bg-gray-50 p-3 text-sm focus:bg-white outline-none"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat: any) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </FormItem>
                        <FormItem label="Publication Status" description="Status cannot be changed manually for security reasons.">
                            <select
                                value={formData.status}
                                disabled
                                className="w-full border border-gray-300 bg-gray-200 p-3 text-sm outline-none font-bold italic opacity-70 cursor-not-allowed"
                            >
                                <option value={0}>Draft</option>
                                <option value={1}>Published</option>
                                <option value={2}>Under Review</option>
                            </select>
                        </FormItem>
                    </div>
                </section>

                {/* Gallery Section */}
                <section>
                    <SectionHeader title="03. Project Gallery" subtitle="Manage screenshots and visuals (Max 5 images)" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {images.map((img, index) => (
                            <div key={img.id || index} className="aspect-video relative group border border-gray-200 bg-gray-50">
                                <img src={img.url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        className="p-1.5 bg-red-600 text-white hover:bg-red-700 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                {index === 0 && (
                                    <div className="absolute top-0 left-0 bg-blue-600 text-white text-[8px] font-bold px-1.5 py-0.5 uppercase">
                                        Cover
                                    </div>
                                )}
                            </div>
                        ))}
                        {images.length < 5 && (
                            <button
                                onClick={handleAddImage}
                                className="aspect-video border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center hover:bg-gray-100 hover:border-gray-800 transition-all group"
                            >
                                <Plus size={20} className="text-gray-400 group-hover:text-gray-800" />
                                <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-800 uppercase mt-1">Add Image</span>
                            </button>
                        )}
                    </div>
                </section>

                {/* Download Links Section */}
                <section>
                    <SectionHeader title="04. Download Links" subtitle="Manage external download locations" />
                    <div className="space-y-4">
                        {urls.length === 0 ? (
                            <div className="p-8 border border-dashed border-gray-200 text-center bg-gray-50">
                                <p className="text-xs text-gray-400 italic">No download links added yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-3">
                                {urls.map((u, index) => (
                                    <div key={u.id || index} className="flex items-center gap-4 border border-gray-300 p-3 bg-gray-50 group hover:bg-white hover:border-gray-800 transition-colors">
                                        <div className="w-10 h-10 bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                                            <LinkIcon size={18} className="text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="text-sm font-bold text-gray-800 truncate uppercase tracking-tight">{u.name}</span>
                                                <a href={u.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                                                    <ExternalLink size={12} />
                                                </a>
                                            </div>
                                            <div className="text-[10px] text-gray-400 truncate font-mono">{u.url}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleRemoveUrl(index)}
                                                className="text-[10px] font-bold uppercase text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button
                            onClick={handleAddUrl}
                            className="flex items-center gap-2 text-xs font-bold uppercase text-blue-600 hover:text-blue-700 transition-colors border border-blue-100 bg-blue-50 px-4 py-2 hover:bg-blue-100"
                        >
                            <Plus size={14} />
                            Add Download Link
                        </button>
                    </div>
                </section>

                {/* Supported Versions Section */}
                <section>
                    <SectionHeader title="05. Supported Versions" subtitle="What versions of Minecraft does this support?" />
                    <div className="space-y-6">
                        {versions.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {versions.map((v, index) => (
                                    <div key={v.id || index} className="flex items-center gap-3 border border-gray-300 p-3 bg-gray-50 group hover:bg-white hover:border-gray-800 transition-colors">
                                        <div className="w-8 h-8 bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                                            <span className="text-[10px] font-bold text-emerald-600 uppercase">
                                                {getPlatformName(v.platformType).substring(0, 1)}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-bold text-gray-800 uppercase tracking-tight">
                                                {getPlatformName(v.platformType)} / {v.name || v.versionNumber}
                                            </div>
                                            <div className="text-[10px] text-gray-400 italic">ID: {v.id}</div>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveVersion(index)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {isAddingVersion ? (
                            <div className="bg-gray-50 border border-emerald-200 p-4 space-y-4 max-w-md animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-gray-500">Select Version</label>
                                    <select
                                        value={selectedVersionId}
                                        onChange={(e) => setSelectedVersionId(e.target.value)}
                                        className="w-full border border-gray-300 bg-white p-2 text-sm outline-none focus:border-emerald-500"
                                    >
                                        <option value="">-- Select a version --</option>
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
                                        className="px-4 py-2 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-700 disabled:opacity-50"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsAddingVersion(false);
                                            setSelectedVersionId('');
                                        }}
                                        className="px-4 py-2 border border-gray-300 text-[10px] font-bold uppercase tracking-widest hover:bg-white"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAddingVersion(true)}
                                className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-600 hover:text-emerald-700 transition-colors border border-emerald-100 bg-emerald-50 px-4 py-2 hover:bg-emerald-100"
                            >
                                <Plus size={14} />
                                Add Supported Version
                            </button>
                        )}
                    </div>
                </section>

                {/* Description Section */}
                <section>
                    <SectionHeader title="06. Detailed Description" subtitle="Describe your project in detail" />
                    <div className="space-y-8">
                        <FormItem label="Long Description">
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full min-h-[300px] border border-gray-300 bg-gray-50 p-6 text-sm outline-none focus:bg-white focus:border-gray-800 leading-relaxed transition-none font-mono"
                                placeholder="Provide a detailed explanation of your project..."
                            />
                        </FormItem>

                        <FormItem label="Changelog (Optional)" description="What's new in the current version?">
                            <textarea
                                value={formData.changelog}
                                onChange={(e) => setFormData({ ...formData, changelog: e.target.value })}
                                className="w-full min-h-[150px] border border-gray-300 bg-gray-50 p-6 text-sm outline-none focus:bg-white focus:border-gray-800 leading-relaxed transition-none font-mono"
                                placeholder="Release notes..."
                            />
                        </FormItem>
                    </div>
                </section>

            </div>

            {/* Footer Actions */}
            <div className="mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                <button
                    onClick={() => router.back()}
                    className="w-full sm:w-auto px-8 sm:px-10 py-3 border border-gray-300 text-[11px] sm:text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-none order-2 sm:order-1"
                >
                    Go Back
                </button>
                <button
                    onClick={handleSave}
                    disabled={submitting}
                    className={`w-full sm:w-auto px-10 sm:px-12 py-3 bg-[#4CAF50] text-white border border-green-600 text-[11px] sm:text-xs font-bold uppercase tracking-widest hover:bg-green-600 transition-none shadow-lg order-1 sm:order-2 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {submitting ? 'Saving...' : 'Save All Changes'}
                </button>
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
