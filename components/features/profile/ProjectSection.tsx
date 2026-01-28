'use client';

import React, { useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

type ProjectStep = 'game' | 'general' | 'description' | 'license';

export default function ProjectSection() {
  const [currentStep, setCurrentStep] = useState<ProjectStep>('general');

  const steps: { id: ProjectStep; label: string }[] = [
    { id: 'game', label: 'Choose Game' },
    { id: 'general', label: 'General' },
    { id: 'description', label: 'Description' },
    { id: 'license', label: 'License' },
  ];

  const handleNext = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 bg-white p-8 border border-zinc-200 rounded-sm shadow-sm">
      <SectionHeading>Project Details</SectionHeading>

      {/* Internal Navbar */}
      <nav className="flex border border-zinc-100 bg-zinc-50/50 rounded-sm overflow-hidden">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(step.id)}
            className={`flex-1 px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-all border-r border-zinc-100 last:border-r-0 ${
              currentStep === step.id
                ? 'bg-white text-green-700'
                : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100/30'
            }`}
          >
            {step.label}
          </button>
        ))}
      </nav>

      {/* Internal Content */}
      <div className="py-6 min-h-[400px]">
        {currentStep === 'game' && (
          <div className="space-y-6 max-w-2xl">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">Select Game Platform</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['Minecraft', 'Terraria', 'Stardew Valley', 'Other'].map(game => (
                <button  key={game} className="border border-zinc-200 p-4 text-left hover:border-zinc-400 hover:bg-zinc-50 rounded-sm transition-all font-bold group">
                  <span className="group-hover:translate-x-1 transition-transform inline-block text-zinc-700">{game}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'general' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Input 
                  label="Project Name"
                  placeholder="Enter project name..."
                  helperText="Use a descriptive name without tags like [Mod]."
                />

                <Input 
                  label="Summary"
                  placeholder="A brief description..."
                  helperText="Clearly describe the purpose of your project."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">Project Logo (400x400)</label>
                <div className="aspect-square w-full max-w-[200px] border border-dashed border-zinc-300 rounded-sm flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 transition-all group">
                  <span className="text-[9px] font-bold uppercase tracking-tight text-zinc-400 group-hover:text-zinc-500">
                    Square Image<br/>Recommended
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600">Project Class</label>
                <select className="w-full border border-zinc-200 rounded-sm p-3 bg-zinc-50/30 font-bold text-xs appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-400">
                  <option>Select class</option>
                  <option>Mod</option>
                  <option>Modpack</option>
                  <option>Resource Pack</option>
                  <option>World</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600">Primary Category</label>
                <select className="w-full border border-zinc-200 rounded-sm p-3 bg-zinc-50/30 font-bold text-xs appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-400">
                  <option>Select category</option>
                  <option>Technology</option>
                  <option>Magic</option>
                  <option>Adventure</option>
                  <option>RPG</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600">Tags</label>
              <div className="flex flex-wrap gap-2">
                {['Optimization', 'Visuals', 'Library', 'Storage'].map(cat => (
                  <label key={cat} className="flex items-center gap-2 border border-zinc-200 px-3 py-1.5 rounded-sm cursor-pointer hover:bg-zinc-50 transition-all group">
                    <input type="checkbox" className="w-4 h-4 accent-zinc-800" />
                    <span className="text-[10px] font-bold uppercase text-zinc-600">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 accent-zinc-800 rounded-sm" />
                <span className="text-xs font-bold text-zinc-600 group-hover:text-zinc-900">Allow community comments</span>
              </label>

              <label className="flex flex-col gap-1 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 accent-zinc-800 rounded-sm" />
                  <span className="text-xs font-bold text-zinc-600 group-hover:text-zinc-900">Mark as Experimental</span>
                </div>
                <p className="text-[9px] font-medium text-zinc-400 ml-7 italic">Invisible in global search until reviewed.</p>
              </label>
            </div>
          </div>
        )}

        {currentStep === 'description' && (
          <Input 
            label="Long Description"
            multiline
            placeholder="Tell us more about your project..."
            className="min-h-[350px] text-zinc-700"
          />
        )}

        {currentStep === 'license' && (
          <div className="space-y-8 max-w-3xl">
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600">Software License</label>
              <select className="w-full border border-zinc-200 rounded-sm p-3 bg-zinc-50/30 font-bold text-xs appearance-none focus:outline-none focus:ring-1 focus:ring-zinc-400">
                <option>MIT License</option>
                <option>GNU GPL v3</option>
                <option>Apache License 2.0</option>
                <option>Custom</option>
              </select>
              <div className="bg-zinc-50 p-4 border-l-2 border-zinc-400 rounded-r-sm">
                <p className="text-[11px] font-medium text-zinc-500">
                  Ensure you have the rights to use the selected license.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600">Distribution Preference</label>
              <select className="w-full border border-zinc-200 rounded-sm p-3 bg-zinc-50/30 font-bold text-xs appearance-none focus:outline-none focus:ring-1 focus:ring-zinc-400">
                <option>Global Public Access</option>
                <option>Private Alpha</option>
              </select>
              <div className="bg-red-50 p-4 border-l-2 border-red-200 rounded-r-sm">
                <p className="text-[11px] font-bold text-red-700 uppercase tracking-tight">
                  Note: External downloads may sync differently with reward programs.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-zinc-100">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === steps[0].id}
          className={currentStep === steps[0].id ? 'opacity-20 cursor-not-allowed' : ''}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className={currentStep === steps[steps.length - 1].id ? 'bg-green-700 hover:bg-green-800 border-none' : ''}
        >
          {currentStep === steps[steps.length - 1].id ? 'Finalize Project' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
