"use client";

import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface ProjectTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function ProjectTabs({ tabs, activeTab, onTabChange }: ProjectTabsProps) {
  return (
    <div className="w-full">
      {/* Mobile Grid Layout - 2 columns */}
      <nav aria-label="Tabs" className="grid grid-cols-2 sm:flex sm:flex-row border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative py-4 px-2 text-sm font-bold uppercase tracking-wider transition-all duration-300
              flex items-center justify-center gap-1.5
              ${activeTab === tab.id
                ? 'text-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/5'
                : 'text-gray-500 dark:text-gray-400 hover:text-emerald-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }
              sm:border-b-2 sm:rounded-none
              ${activeTab === tab.id ? 'sm:border-emerald-500' : 'sm:border-transparent'}
              border border-gray-100 dark:border-gray-700 sm:border-t-0 sm:border-l-0 sm:border-r-0
            `}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                }`}>
                {tab.count}
              </span>
            )}

            {/* Indicator for mobile active tab */}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 sm:hidden"></div>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
