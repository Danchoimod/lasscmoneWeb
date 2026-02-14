"use client";

import React, { useState } from 'react';
import ProjectBreadcrumbs from '@/components/features/project/ProjectBreadcrumbs';
import ProjectGallery from '@/components/features/project/ProjectGallery';
import ProjectTabs from '@/components/features/project/ProjectTabs';
import ProjectSidebar from '@/components/features/project/ProjectSidebar';

export default function ProjectDetailPage() {
  const [activeTab, setActiveTab] = useState('description');

  const projectData = {
    id: 'complex-machines',
    title: 'Complex Machines',
    category: 'Technology',
    event: 'ModJam 2025',
    badge: 'ADD-ON',
    breadcrumbs: [
      { label: 'Mods', href: '/mods' },
      { label: 'Technology', href: '/mods/technology' },
      { label: 'Complex Machines' }
    ],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCDZxufYPF37rYaf5MQngCCyWRGfIFzmSjOKOOJ5khjeoZ7HHarua2tWY8wsy5j0Q1yCx40DBjAiHIDzFgoiXsHXFYVUdj0UMEzUeBsBFc-DmkXziWEGI8kARpVd9uniD2fqAXPXa65U9vLcmUNeXiz4eCimTNIW5a67wkkfzBsvqBJP2eisim9BzHwZVBmRU00PLvRImiypphej5QlLrUuFME8rkHQ5qBxH2RpQ2ddx_IDBB0EdpWqm8_rAeNp9xQ_LWGKFm-XMw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSg1EqEEeko4W8mj7TPaBiy6MI-71VzjTnwKGsz5fE4bKcQatIEvkxrfIAvP2pMlUDxpToTT_F0r6dKwf_8ePnxZWeyNPQF1TQVJg26GbN0pAj2iNJXFu9COWnr3-UmdAawD5b_c_joTuVhU3qUD51Z38Fxn_DaNfMA_46Obn1NKfY5nYuIzKqZxgy-q9ISX7Tp0GufBRJg67wv3LFpg4YBujfD_ALUsjRREsWcP9EFM_hda8vrRx5z0xdLv1og3f2Nj3UEis-DA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDl4k3wCnreC6bLYgGUnPRGiWYUVVEKy6KRYZrpIZvARQ8Vvq6RGqgZ7Cs2TnsNY58tGL-lVS3UCtJRNXMGsShH601tyk5yzOGnJ4Ltz3mW9S3ugiztFj7Vn4Kn-CBIy7-8UsnbXxRXxPxs4CRkbU61h_gKhZlnXbvifn_VSt2DMFwUk3-Z5tfPLFQ5DA_y-nzvPkqZM-1-ZjypQGqs14pZyP_mJd1VUbZd48JWvGhHNtRndY6L2V3nvpWY82VYa6joDPf2NBC8Uw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ6jN4-d9BKz2T5BvjCZFBSi3vbbQgxOBwU59CyEB-VGGPBn41oh32k6ngnAHPm9is-vmVWXPf4iiOQnzbpRAh7eOfuN7DFWzhYBXAaNGwOKsFDiE-dX6ZIOmkIcCenALDqzjDFDvwcwOMXvH_ryq9aovIKB0ZoMhK1_guGU19JnUyCFTlV9bAHeLm1yJmTQ9o1U9cTem1xWSxNQH1syAtX7PO62drVrayR4Nwovm_BF9dL3BwnT8SfClzP2FQWxYrSbKrYS2rZw'
    ],
    creator: {
      name: 'BlockPlay',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7yty0FfTVlYIMnhXDzrG5FEXNCqcKNNjVi4dJZtyTpwzEe0axRXWJkvhGN071jv8b914tVlPHwYvj-dYx2jPhBv9eSdOaDQpVnUSL7WSBNW05yGFyGJ4QSzU3oDpNkXKL613LCp_2B4pEFPcETPd_xAMLScug9JfPsvkGz9M6RhYkY0Af-3f76e00Dxh6k9tkhq-Ftvy4mfuA9c0KXAEd4ztHf5F7PTEU1iko8qkdbQe4fRWUrGFTKjjZL9JO5IE_mBRpbbsbVQ',
      verified: true
    },
    stats: {
      version: 'v1.4.2-stable',
      lastUpdated: '27 Jan, 2026',
      downloads: '124,502',
      rating: 4.8
    },
    tags: ['Industrial', 'Automation', 'Hardcore', 'Energy', 'Redstone'],
    otherFromCreator: [
      {
        name: 'Advanced Pipes',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtbIcKYpjxmV6-EF25qYLmQCXiFs7LkWPxG5qN1IeM25X_T00nvvUeuOyDooP9uxOo-n3Uh9tK36D25KRpct8l2UtEZLb570QM5kheGMhpCME5dvZeWAzfepZCfrcJZbJh8Maq9Wy_GBRhe8rRdPFCXFLg20isLzUM09CeaIpTU8kyvHAT5GuNvKTPCEvn1GAAd1kQMIByzhJfjI8q8aESL7mUFf9wBzkUZ5WoISiZ1OKCn5paTAxpsBBSMgAZ8NhWnWVU-GDbcQ',
        downloads: '23k'
      },
      {
        name: 'Nuclear Reactors',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuiq7IMGIVrBiK6UBIEg_y665l_e9vjhEtjBu8qZ2HHrFmhGYDZRCd0FnWHPJIFd7DnDW2eseH7djIaO37sj62GZucwPykEvj9WAkwJC6-UNGwgxhWAqFQzx09dbHPjYQh-DWWR5uhIZqfRCmOunxF-k2YSLLO8awzW622yJwr9SdYy0XM-9uRSFOVnI1jyDiIyyiHtMVG7NuSgiCgqwXeDvqzWvC2hb5dY6ZNX0NfI2gArVF9xekXnxNd1DZLxZpaJHKpIHp22A',
        downloads: '15k'
      }
    ],
    tabs: [
      { id: 'description', label: 'Description' },
      { id: 'changelog', label: 'Changelog' },
      { id: 'comments', label: 'Comments', count: 12 },
      { id: 'installation', label: 'Installation' }
    ]
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProjectBreadcrumbs items={projectData.breadcrumbs} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <ProjectGallery images={projectData.images} badge={projectData.badge} />

            {/* Main Content Card - Removed all rounded corners */}
            <div className="bg-white dark:bg-gray-800 rounded-none shadow-sm border border-gray-200 dark:border-gray-700">

              {/* Tabs Scroll Container - FIXED FOR MOBILE */}
              <div className="w-full border-b border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto overflow-y-hidden transition-all scrollbar-hide">
                  <div className="min-w-max">
                    <ProjectTabs
                      tabs={projectData.tabs}
                      activeTab={activeTab}
                      onTabChange={setActiveTab}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 text-gray-700 dark:text-gray-300 max-w-none">
                {activeTab === 'description' && (
                  <div className="animate-in fade-in duration-300">
                    <h2 className="text-2xl font-bold mb-4 italic text-gray-900 dark:text-white uppercase tracking-tight">About {projectData.title}</h2>
                    <p className="mb-4">
                      Unknown Technology changes your complete play style. You create complex machines and try to survive in a world where technology is the only key to survival.
                      This add-on introduces over 50 new blocks, modular machinery, and a completely new energy system (Redstone Flux compatible).
                    </p>
                    <h3 className="text-lg font-bold mt-6 mb-2 text-gray-900 dark:text-white uppercase">Key Features:</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      <li><strong>Automated Mining:</strong> Build drills that mine for you while you focus on building.</li>
                      <li><strong>Power Generation:</strong> Solar panels, wind turbines, and coal generators.</li>
                      <li><strong>New Ores:</strong> Copper, Tin, and Aluminum scattered across the world.</li>
                      <li><strong>Custom Crafting Table:</strong> Used to assemble complex components.</li>
                    </ul>
                    <p>
                      Join the discord community for updates and to share your builds! This mod is designed for both single-player survival and multiplayer SMP servers.
                    </p>
                  </div>
                )}

                {activeTab === 'changelog' && (
                  <div className="animate-in fade-in duration-300">
                    <p className="text-gray-500 italic">No changelog entries yet.</p>
                  </div>
                )}

                {activeTab === 'comments' && (
                  <div className="animate-in fade-in duration-300">
                    <p className="text-gray-500 italic">Comments section coming soon...</p>
                  </div>
                )}

                {activeTab === 'installation' && (
                  <div className="animate-in fade-in duration-300">
                    <p className="text-gray-500 italic">Installation guide coming soon...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <ProjectSidebar
              title={projectData.title}
              category={projectData.category}
              event={projectData.event}
              creator={projectData.creator}
              stats={projectData.stats}
              tags={projectData.tags}
              otherFromCreator={projectData.otherFromCreator}
            />
          </div>
        </div>
      </main>
    </div>
  );
}