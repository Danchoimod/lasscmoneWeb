"use client";

import React from "react";
import ContentCard from "./ContentCard";

const ContentGrid = () => {
  const data = [
    {
      id: "complex-machines",
      author: "BlockPlay",
      authorAvatar: "/icons/icon.jpg",
      rating: 4,
      date: "27 Jan, 2026",
      thumbnail: "https://i.ytimg.com/vi/aJ6skzuHztI/maxresdefault.jpg",
      category: "Add-On",
      tags: ["ModJam 2025", "Technology"],
      title: "Complex Machines",
      description: "Unknown Technology changes your complete play style. You create complex machines and try to be as efficient as possible to create new Materials.",
      shares: { facebook: 4, twitter: 4, total: 301 }
    },
    {
      id: "muzan-addon",
      author: "Bedrock Studio 1",
      authorAvatar: "/icons/icon.jpg",
      rating: 5,
      date: "27 Jan, 2026",
      thumbnail: "https://media.forgecdn.net/attachments/1468/221/muzan-png.png",
      category: "Add-On",
      tags: ["Data Packs", "Players", "Horror", "Magic", "Survival"],
      title: "MUZAN (what it's feel to be villain bosses in mine...",
      description: "In the Muzan add-on, you will burn during the daytime, but you will have insane power at night.",
      shares: { facebook: 1, twitter: 1, total: 3 }
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <ContentCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ContentGrid;
