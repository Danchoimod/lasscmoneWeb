'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

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

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    // Mock initial data - in a real app, this would be fetched based on 'id'
    const [formData, setFormData] = useState({
        name: 'Advanced Machinery',
        summary: 'A comprehensive technical mod for automation.',
        platform: 'Minecraft',
        class: 'Mod',
        category: 'Technology',
        features: ['Optimization', 'Storage'],
        description: 'This is a long description of the Advanced Machinery project. It includes many details about how the machinery works and what blocks are added.',
        license: 'MIT License'
    });

    const handleSave = () => {
        console.log('Saving project:', formData);
        alert('Project settings saved successfully!');
        router.push('/profile/project');
    };

    return (
        <div className="bg-white border border-gray-300 shadow-sm p-4 sm:p-12 mb-12">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-10 sm:mb-12 gap-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tighter uppercase">Edit Project</h1>
                    <p className="text-[11px] sm:text-sm text-gray-400 sm:text-gray-500 font-medium mt-1 uppercase tracking-wider italic">ID: {id} &bull; Updated 2h ago</p>
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
                        className="flex-[2] sm:flex-none px-6 sm:px-8 py-2 bg-gray-800 text-white border border-gray-800 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-black transition-none shadow-sm"
                    >
                        Save Changes
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
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border border-gray-300 bg-gray-50 p-3 text-sm outline-none focus:bg-white focus:border-gray-800 transition-none"
                                    placeholder="e.g. My Awesome Mod"
                                />
                            </FormItem>
                        </div>
                        <div className="md:col-span-2">
                            <FormItem label="Summary" description="A brief overview that appears in search results.">
                                <input
                                    value={formData.summary}
                                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                    className="w-full border border-gray-300 bg-gray-50 p-3 text-sm outline-none focus:bg-white focus:border-gray-800 transition-none"
                                    placeholder="Describe your project in a few words..."
                                />
                            </FormItem>
                        </div>
                    </div>
                </section>

                {/* Platform & Visuals */}
                <section>
                    <SectionHeader title="02. Platform & Visuals" subtitle="Select where your project runs and how it looks" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            <FormItem label="Game Platform">
                                <select
                                    value={formData.platform}
                                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                    className="w-full border border-gray-300 bg-gray-50 p-3 text-sm focus:bg-white outline-none"
                                >
                                    <option>Minecraft</option>
                                    <option>Terraria</option>
                                    <option>Stardew Valley</option>
                                    <option>Other</option>
                                </select>
                            </FormItem>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormItem label="Project Class">
                                    <select
                                        value={formData.class}
                                        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                        className="w-full border border-gray-300 bg-gray-50 p-3 text-sm focus:bg-white outline-none"
                                    >
                                        <option>Mod</option>
                                        <option>Modpack</option>
                                        <option>World</option>
                                    </select>
                                </FormItem>
                                <FormItem label="Primary Category">
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full border border-gray-300 bg-gray-50 p-3 text-sm focus:bg-white outline-none"
                                    >
                                        <option>Technology</option>
                                        <option>Magic</option>
                                        <option>Adventure</option>
                                        <option>Visuals</option>
                                    </select>
                                </FormItem>
                            </div>
                        </div>

                        <div className="order-first md:order-last">
                            <FormItem label="Project Logo">
                                <div className="aspect-square w-full max-w-[200px] md:max-w-none mx-auto border border-gray-300 bg-gray-50 flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-gray-100 border-dashed group transition-none">
                                    <div className="w-10 h-10 md:w-12 md:h-12 mb-3 border border-gray-300 rounded-full flex items-center justify-center text-gray-400 group-hover:border-gray-800 group-hover:text-gray-800 transition-none">
                                        <span className="font-bold text-xl">+</span>
                                    </div>
                                    <span className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-tighter leading-tight">400x400 Recommended<br />JPG, PNG, GIF</span>
                                </div>
                            </FormItem>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section>
                    <SectionHeader title="03. Project Features" subtitle="Select tags that best describe your project" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['Optimization', 'Visuals', 'Library', 'Storage', 'Power', 'Magic', 'Tools', 'World Gen'].map(tag => (
                            <label key={tag} className="flex items-center gap-3 border border-gray-200 p-3 bg-gray-50 cursor-pointer hover:bg-white hover:border-gray-800 transition-none select-none">
                                <input
                                    type="checkbox"
                                    checked={formData.features.includes(tag)}
                                    onChange={(e) => {
                                        const newFeatures = e.target.checked
                                            ? [...formData.features, tag]
                                            : formData.features.filter(f => f !== tag);
                                        setFormData({ ...formData, features: newFeatures });
                                    }}
                                    className="w-4 h-4 accent-gray-800"
                                />
                                <span className="text-xs font-bold text-gray-700 uppercase tracking-tighter">{tag}</span>
                            </label>
                        ))}
                    </div>
                </section>

                {/* Description Section */}
                <section>
                    <SectionHeader title="04. Detailed Description" subtitle="Describe your project in detail using markdown" />
                    <FormItem label="Long Description">
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full min-h-[400px] border border-gray-300 bg-gray-50 p-6 text-sm outline-none focus:bg-white focus:border-gray-800 leading-relaxed transition-none font-mono"
                            placeholder="Provide a detailed explanation of your project..."
                        />
                    </FormItem>
                </section>

                {/* License Section */}
                <section>
                    <SectionHeader title="05. Software & Licensing" subtitle="Legal details and usage rights" />
                    <div className="max-w-md space-y-4">
                        <FormItem label="Project License">
                            <select
                                value={formData.license}
                                onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                                className="w-full border border-gray-300 bg-gray-50 p-3 text-sm focus:bg-white outline-none"
                            >
                                <option>MIT License</option>
                                <option>GNU GPL v3</option>
                                <option>Apache License 2.0</option>
                                <option>All Rights Reserved</option>
                                <option>Custom</option>
                            </select>
                        </FormItem>
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <span className="text-amber-800 font-bold">!</span>
                                </div>
                                <div className="ml-3">
                                    <p className="text-[11px] font-medium text-amber-800 leading-tight italic">
                                        Changing the license after publication may have legal implications. Ensure you have the rights to all content.
                                    </p>
                                </div>
                            </div>
                        </div>
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
                    className="w-full sm:w-auto px-10 sm:px-12 py-3 bg-gray-800 text-white border border-gray-800 text-[11px] sm:text-xs font-bold uppercase tracking-widest hover:bg-black transition-none shadow-lg order-1 sm:order-2"
                >
                    Save Everything
                </button>
            </div>
        </div>
    );
}
