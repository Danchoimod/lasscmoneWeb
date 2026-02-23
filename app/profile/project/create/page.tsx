'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createProject } from '@/lib/actions';
import { getCategories, getVersions } from '@/lib/api';
import Toast, { ToastType } from '@/components/common/Notification';
import { Trash2, Plus, Link as LinkIcon, Image as ImageIcon, ExternalLink, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

// Classic Section Heading
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-6 border-b-2 border-gray-800 pb-2">
        <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">{children}</h2>
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

type ProjectStep = 'general' | 'resources' | 'description' | 'finish';

export default function CreateProjectPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<ProjectStep>('general');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [availableVersions, setAvailableVersions] = useState<any[]>([]);

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

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        shortSummary: '',
        description: '',
        catId: '',
        license: 'MIT License',
    });

    const [images, setImages] = useState<{ url: string }[]>([]);
    const [urls, setUrls] = useState<{ name: string, url: string }[]>([]);
    const [versions, setVersions] = useState<any[]>([]);

    // Selection state for adding versions
    const [isAddingVersion, setIsAddingVersion] = useState(false);
    const [selectedVersionId, setSelectedVersionId] = useState('');

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [cats, vers] = await Promise.all([
                    getCategories(),
                    getVersions()
                ]);
                setCategories(cats || []);
                setAvailableVersions(vers || []);
            } catch (error) {
                console.error("Failed to load categories/versions:", error);
            }
        };
        loadInitialData();
    }, []);

    const steps: { id: ProjectStep; label: string }[] = [
        { id: 'general', label: 'Basic Info' },
        { id: 'resources', label: 'Media & Links' },
        { id: 'description', label: 'Description' },
        { id: 'finish', label: 'License & Post' },
    ];

    const handleNext = () => {
        if (currentStep === 'general') {
            if (!formData.title || !formData.catId) {
                showNotification("Please fill in the project name and category", "error");
                return;
            }
            setCurrentStep('resources');
        } else if (currentStep === 'resources') {
            setCurrentStep('description');
        } else if (currentStep === 'description') {
            if (!formData.description) {
                showNotification("Please provide a description", "error");
                return;
            }
            setCurrentStep('finish');
        } else {
            handleCreateProject();
        }
    };

    const handlePrev = () => {
        const currentIndex = steps.findIndex(s => s.id === currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1].id);
        } else {
            router.push('/profile/project');
        }
    };

    const handleCreateProject = async () => {
        try {
            setLoading(true);
            const payload = {
                title: formData.title,
                shortSummary: formData.shortSummary,
                description: formData.description,
                catId: parseInt(formData.catId),
                images: images.map(img => img.url),
                urls: urls.map(u => ({ name: u.name, url: u.url })),
                versions: versions.map(v => ({
                    id: v.id,
                    platformType: v.platformType?.toString() || "1",
                    versionNumber: v.name || v.versionNumber
                })),
                status: 0 // Explicitly set status to 0 (Pending)
            };

            const result = await createProject(payload);
            if (result.success) {
                showNotification("Project created successfully!", "success");
                setTimeout(() => {
                    router.push('/profile/project');
                }, 1500);
            } else {
                showNotification(result.error || "Failed to create project", "error");
            }
        } catch (error) {
            showNotification("An error occurred", "error");
        } finally {
            setLoading(false);
        }
    };

    // Helper functions for dynamic lists
    const handleAddImage = () => {
        const url = prompt("Enter Image URL:");
        if (url) setImages([...images, { url }]);
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleAddUrl = () => {
        const name = prompt("Enter Link Name (e.g. Mediafire):");
        const url = prompt("Enter Download URL:");
        if (name && url) setUrls([...urls, { name, url }]);
    };

    const handleRemoveUrl = (index: number) => {
        setUrls(urls.filter((_, i) => i !== index));
    };

    const handleAddVersion = () => {
        const ver = availableVersions.find(v => v.id.toString() === selectedVersionId);
        if (ver && !versions.find(v => v.id === ver.id)) {
            setVersions([...versions, ver]);
            setSelectedVersionId('');
            setIsAddingVersion(false);
        }
    };

    const handleRemoveVersion = (index: number) => {
        setVersions(versions.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-white p-4 sm:p-10 border border-gray-300 shadow-sm min-h-screen rounded-none">
            <SectionHeading>Create New Project</SectionHeading>

            {/* Stepper Header */}
            <nav className="w-full border-b border-gray-300 mb-10 overflow-x-auto scrollbar-hide">
                <div className="flex min-w-max">
                    {steps.map((step, idx) => {
                        const isActive = currentStep === step.id;
                        const isDone = steps.findIndex(s => s.id === currentStep) > idx;
                        return (
                            <button
                                key={step.id}
                                onClick={() => {
                                    const targetIdx = steps.findIndex(s => s.id === step.id);
                                    const currentIdx = steps.findIndex(s => s.id === currentStep);
                                    if (targetIdx < currentIdx) setCurrentStep(step.id);
                                }}
                                className={`px-6 py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest border-t border-x -mb-[1px] transition-none flex items-center gap-2 ${isActive
                                    ? 'bg-white border-gray-300 border-t-2 border-t-green-600 text-black'
                                    : isDone
                                        ? 'bg-gray-50 border-transparent text-green-600'
                                        : 'bg-gray-100 border-transparent text-gray-400 cursor-default'
                                    }`}
                            >
                                {isDone ? <CheckCircle2 size={14} /> : <span>{idx + 1}.</span>}
                                {step.label}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Content Area */}
            <div className="min-h-[500px] max-w-5xl">
                {currentStep === 'general' && (
                    <div className="space-y-8 animate-in fade-in duration-400 slide-in-from-bottom-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div className="md:col-span-2 space-y-6">
                                <FormItem label="Project Name" description="Give your project a clear, unique name.">
                                    <input
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full border border-gray-300 bg-gray-50 p-4 text-sm outline-none focus:bg-white focus:border-gray-800 transition-none"
                                        placeholder="e.g. Extreme Survival Mod"
                                    />
                                </FormItem>

                                <FormItem label="Short Summary" description="A quick overview (max 150 chars).">
                                    <input
                                        value={formData.shortSummary}
                                        onChange={(e) => setFormData({ ...formData, shortSummary: e.target.value })}
                                        className="w-full border border-gray-300 bg-gray-50 p-4 text-sm outline-none focus:bg-white focus:border-gray-800 transition-none"
                                        placeholder="Briefly explain what this project does..."
                                    />
                                </FormItem>
                            </div>

                            <div className="space-y-4">
                                <FormItem label="Project Icon" description="Automatically takes the first image from your gallery.">
                                    <div
                                        onClick={images.length === 0 ? handleAddImage : undefined}
                                        className={`aspect-square border-2 ${images.length > 0 ? 'border-gray-300' : 'border-dashed border-gray-300'} bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden transition-all ${images.length === 0 ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                                    >
                                        {images.length > 0 ? (
                                            <img src={images[0].url} alt="Icon" className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <Plus className="text-gray-300 mb-2" size={32} />
                                                <span className="text-[10px] font-bold text-gray-400 uppercase">Add Icon / Image</span>
                                            </>
                                        )}
                                        {images.length > 0 && (
                                            <div className="absolute top-0 left-0 bg-gray-800 text-white text-[8px] font-bold px-2 py-1 uppercase tracking-tighter">
                                                Cover / Icon
                                            </div>
                                        )}
                                    </div>
                                </FormItem>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormItem label="Primary Category">
                                <select
                                    value={formData.catId}
                                    onChange={(e) => setFormData({ ...formData, catId: e.target.value })}
                                    className="w-full border border-gray-300 bg-gray-50 p-4 text-sm focus:bg-white outline-none"
                                >
                                    <option value="">-- Select Category --</option>
                                    {categories.map((cat: any) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </FormItem>
                        </div>
                    </div>
                )}

                {currentStep === 'resources' && (
                    <div className="space-y-12 animate-in fade-in duration-400 slide-in-from-bottom-2">
                        {/* Images Section */}
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-700 block">Screenshots & Gallery</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                                {images.map((img, idx) => (
                                    <div key={idx} className="aspect-video relative group border border-gray-200 bg-gray-100">
                                        <img src={img.url} alt="Gallery" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                onClick={() => handleRemoveImage(idx)}
                                                className="p-1.5 bg-red-600 text-white hover:bg-red-700 transition-colors"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                        {idx === 0 && (
                                            <div className="absolute top-0 left-0 bg-gray-800 text-white text-[8px] font-bold px-2 py-1 uppercase tracking-tighter">
                                                Cover / Icon
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {images.length < 5 && (
                                    <button
                                        onClick={handleAddImage}
                                        className="aspect-video border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center hover:bg-gray-100 hover:border-gray-800 transition-all text-gray-400 hover:text-gray-800"
                                    >
                                        <Plus size={20} />
                                        <span className="text-[9px] font-bold uppercase mt-1">Add Image</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Links Section */}
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-700 block">External Download Links</label>
                            <div className="space-y-2">
                                {urls.map((u, idx) => (
                                    <div key={idx} className="flex items-center gap-4 border border-gray-300 p-3 bg-gray-50">
                                        <LinkIcon size={16} className="text-blue-500" />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-bold truncate uppercase">{u.name}</div>
                                            <div className="text-[10px] text-gray-400 truncate font-mono">{u.url}</div>
                                        </div>
                                        <button onClick={() => handleRemoveUrl(idx)} className="text-[10px] font-bold text-red-500 uppercase hover:underline">Remove</button>
                                    </div>
                                ))}
                                <button
                                    onClick={handleAddUrl}
                                    className="flex items-center gap-2 text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-4 py-2 border border-blue-100 hover:bg-blue-100"
                                >
                                    <Plus size={14} /> Add New Link
                                </button>
                            </div>
                        </div>

                        {/* Versions Section */}
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-700 block">Supported Versions</label>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {versions.map((v, idx) => (
                                    <div key={idx} className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-emerald-700">
                                        <span className="text-[10px] font-bold uppercase font-mono">{v.name}</span>
                                        <button onClick={() => handleRemoveVersion(idx)} className="hover:text-red-600"><Trash2 size={12} /></button>
                                    </div>
                                ))}
                            </div>

                            {isAddingVersion ? (
                                <div className="flex gap-2 max-w-sm">
                                    <select
                                        value={selectedVersionId}
                                        onChange={(e) => setSelectedVersionId(e.target.value)}
                                        className="flex-1 border border-emerald-200 bg-white p-2 text-xs outline-none"
                                    >
                                        <option value="">Select version...</option>
                                        {availableVersions
                                            .filter(av => !versions.find(v => v.id === av.id))
                                            .map(av => <option key={av.id} value={av.id}>{av.name}</option>)
                                        }
                                    </select>
                                    <button onClick={handleAddVersion} className="bg-emerald-600 text-white px-4 py-2 text-[10px] font-bold uppercase">Add</button>
                                    <button onClick={() => setIsAddingVersion(false)} className="border border-gray-300 px-4 py-2 text-[10px] font-bold uppercase">X</button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsAddingVersion(true)}
                                    className="flex items-center gap-2 text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-4 py-2 border border-emerald-100 hover:bg-emerald-100"
                                >
                                    <Plus size={14} /> Add Version Support
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {currentStep === 'description' && (
                    <div className="space-y-4 animate-in fade-in duration-400 slide-in-from-bottom-2">
                        <FormItem label="Long Description" description="Explain your project in detail. Markdown is supported.">
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full min-h-[400px] border border-gray-300 bg-gray-50 p-6 text-sm outline-none focus:bg-white focus:border-gray-800 leading-relaxed font-mono"
                                placeholder="Describe features, installation, usage..."
                            />
                        </FormItem>
                    </div>
                )}

                {currentStep === 'finish' && (
                    <div className="space-y-10 animate-in fade-in duration-400 slide-in-from-bottom-2">
                        <div className="bg-amber-50 border border-amber-200 p-6 text-amber-800">
                            <h4 className="font-bold flex items-center gap-2 mb-2">
                                <ExternalLink size={18} /> Review Guidelines
                            </h4>
                            <p className="text-xs leading-relaxed">
                                Once submitted, your project will be reviewed by our moderators. This process typically takes 1-2 business days.
                                Make sure your project follows our community guidelines and doesn't contain malicious code.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <FormItem label="Software License">
                                <select
                                    value={formData.license}
                                    onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                                    className="w-full border border-gray-300 bg-gray-50 p-4 text-sm focus:bg-white outline-none"
                                >
                                    <option>MIT License</option>
                                    <option>GNU GPL v3</option>
                                    <option>Apache License 2.0</option>
                                    <option>Custom / All Rights Reserved</option>
                                </select>
                            </FormItem>

                            <div className="space-y-3 pt-4">
                                <div className="text-xs font-bold uppercase text-gray-400">Project Overview</div>
                                <div className="grid grid-cols-2 gap-4 text-[11px]">
                                    <div className="p-3 border border-gray-100 bg-gray-50"><span className="text-gray-400 mr-2">Title:</span> {formData.title || '(Empty)'}</div>
                                    <div className="p-3 border border-gray-100 bg-gray-50"><span className="text-gray-400 mr-2">Category:</span> {categories.find(c => c.id.toString() === formData.catId)?.name || '(None)'}</div>
                                    <div className="p-3 border border-gray-100 bg-gray-50"><span className="text-gray-400 mr-2">Images:</span> {images.length} added</div>
                                    <div className="p-3 border border-gray-100 bg-gray-50"><span className="text-gray-400 mr-2">Versions:</span> {versions.length} supported</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-300 mt-12 gap-4">
                <button
                    onClick={handlePrev}
                    className="w-full sm:w-auto px-8 py-3 border border-gray-300 text-[10px] font-bold uppercase tracking-widest transition-all bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2"
                >
                    <ChevronLeft size={14} /> {currentStep === 'general' ? 'Cancel' : 'Back'}
                </button>
                <button
                    onClick={handleNext}
                    disabled={loading}
                    className={`w-full sm:w-auto px-10 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all flex items-center justify-center gap-2 shadow-lg ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-black'}`}
                >
                    {loading ? (
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>
                            {currentStep === 'finish' ? 'Submit for Review' : 'Next Step'} <ChevronRight size={14} />
                        </>
                    )}
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
