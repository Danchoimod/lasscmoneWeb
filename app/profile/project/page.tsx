'use client';

import React, { useState } from 'react';

// Thành phần tiêu đề Section kiểu Classic
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-6 border-b-2 border-gray-800 pb-2">
    <h2 className="text-xl font-bold text-gray-800">{children}</h2>
  </div>
);

type ProjectStep = 'game' | 'general' | 'description' | 'license';

export default function ProjectPage() {
  const [currentStep, setCurrentStep] = useState<ProjectStep>('general');

  const steps: { id: ProjectStep; label: string }[] = [
    { id: 'game', label: '1. Choose Game' },
    { id: 'general', label: '2. General Info' },
    { id: 'description', label: '3. Description' },
    { id: 'license', label: '4. License' },
  ];

  const handleNext = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex < steps.length - 1) setCurrentStep(steps[currentIndex + 1].id);
  };

  const handlePrev = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex > 0) setCurrentStep(steps[currentIndex - 1].id);
  };

  return (
    <div className="bg-white p-8 border border-gray-300 transition-none min-h-screen">
      <SectionHeading>Project Details</SectionHeading>

      {/* Classic Tab Navigation */}
      <nav className="flex border-b border-gray-300 mb-8">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(step.id)}
            className={`px-6 py-3 text-xs font-bold uppercase tracking-tight border-t border-x -mb-[1px] transition-none ${
              currentStep === step.id
                ? 'bg-white border-gray-300 border-t-2 border-t-green-600 text-black'
                : 'bg-gray-100 border-transparent text-gray-500 hover:bg-gray-200'
            }`}
          >
            {step.label}
          </button>
        ))}
      </nav>

      {/* Internal Content */}
      <div className="min-h-[450px]">
        {currentStep === 'game' && (
          <div className="space-y-6">
            <label className="block text-xs font-bold uppercase text-gray-700">Select Game Platform</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {['Minecraft', 'Terraria', 'Stardew Valley', 'Other'].map(game => (
                <button key={game} className="border border-gray-300 p-4 text-left bg-gray-50 hover:bg-white hover:border-gray-800 font-bold text-sm transition-none">
                  {game}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'general' && (
          <div className="space-y-8 max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-gray-700">Project Name</label>
                  <input className="border border-gray-300 bg-gray-50 p-2.5 text-sm outline-none focus:bg-white focus:border-gray-800" placeholder="e.g. My Awesome Mod" />
                  <p className="text-[10px] text-gray-400 italic">Do not include tags like [MOD] in the title.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-gray-700">Summary</label>
                  <input className="border border-gray-300 bg-gray-50 p-2.5 text-sm outline-none focus:bg-white focus:border-gray-800" placeholder="Short summary..." />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-700">Project Logo</label>
                <div className="aspect-square border border-gray-300 bg-gray-100 flex items-center justify-center p-4 text-center cursor-pointer hover:bg-gray-200 border-dashed">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">400x400<br/>Required</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-gray-700">Project Class</label>
                  <select className="border border-gray-300 bg-gray-50 p-2.5 text-sm outline-none">
                    <option>Mod</option>
                    <option>Modpack</option>
                    <option>World</option>
                    <option>World</option>
                  </select>
               </div>
               <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-gray-700">Primary Category</label>
                  <select className="border border-gray-300 bg-gray-50 p-2.5 text-sm outline-none">
                    <option>Technology</option>
                    <option>Magic</option>
                  </select>
               </div>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase text-gray-700">Project Features</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['Optimization', 'Visuals', 'Library', 'Storage'].map(tag => (
                  <label key={tag} className="flex items-center gap-2 border border-gray-200 p-2 bg-gray-50 cursor-pointer hover:bg-white">
                    <input type="checkbox" className="w-4 h-4 accent-gray-800" />
                    <span className="text-[11px] font-bold text-gray-600">{tag}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 'description' && (
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-700">Long Description</label>
            <textarea 
              className="w-full min-h-[400px] border border-gray-300 bg-gray-50 p-4 text-sm outline-none focus:bg-white focus:border-gray-800 leading-relaxed"
              placeholder="Detailed information about your project..."
            />
          </div>
        )}

        {currentStep === 'license' && (
          <div className="space-y-8 max-w-2xl">
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase text-gray-700">Software License</label>
              <select className="w-full border border-gray-300 bg-gray-50 p-3 text-sm">
                <option>MIT License</option>
                <option>GNU GPL v3</option>
                <option>Custom</option>
              </select>
              <div className="bg-gray-100 p-4 border-l-4 border-gray-400 text-[11px] text-gray-600">
                Ensure you comply with the selected license terms.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons - Classic Style */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-300 mt-10">
        <button
          onClick={handlePrev}
          disabled={currentStep === steps[0].id}
          className={`px-6 py-2 border border-gray-300 text-xs font-bold uppercase tracking-widest transition-none ${
            currentStep === steps[0].id ? 'bg-gray-50 text-gray-300' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          &larr; Previous Step
        </button>
        <button
          onClick={handleNext}
          className="bg-gray-800 border border-gray-800 px-8 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-black transition-none"
        >
          {currentStep === steps[steps.length - 1].id ? 'Finalize Project' : 'Next Step &rarr;'}
        </button>
      </div>
    </div>
  );
}
