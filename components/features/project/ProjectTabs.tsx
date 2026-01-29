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
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav aria-label="Tabs" className="flex px-6 space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-emerald-500 text-emerald-500'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-emerald-500 hover:border-emerald-500'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && <span className="ml-1">({tab.count})</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}
