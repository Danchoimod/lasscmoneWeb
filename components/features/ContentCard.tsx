"use client";

import React from "react";
import Image from "next/image";
import { Star, Facebook, Twitter, Share2 } from "lucide-react";

interface ContentCardProps {
  author: string;
  authorAvatar: string;
  rating: number;
  date: string;
  thumbnail: string;
  category: string;
  tags: string[];
  title: string;
  description: string;
  shares: {
    facebook: number;
    twitter: number;
    total: number;
  };
}

const ContentCard = ({
  author,
  authorAvatar,
  rating,
  date,
  thumbnail,
  category,
  tags,
  title,
  description,
  shares,
}: ContentCardProps) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-sm overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
      {/* Header Info */}
      <div className="p-3 flex justify-between items-start">
        <div className="flex gap-2">
           <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-zinc-100">
             <Image src={authorAvatar} alt={author} width={40} height={40} />
           </div>
           <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-[#3b82f6] font-bold text-sm">By {author}</span>
                <div className="w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-[8px] text-white">✓</span>
                </div>
              </div>
              <span className="text-[11px] text-zinc-500">Published on {date}</span>
           </div>
        </div>
        <div className="flex items-center gap-1">
           <span className="font-bold text-zinc-700">{rating}</span>
           <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
        </div>
      </div>

      {/* Main Thumbnail */}
      <div className="relative aspect-video w-full bg-zinc-100">
        <Image src={thumbnail} alt={title} fill className="object-cover" />
        <div className="absolute bottom-0 right-0 bg-[#4CAF50] text-white px-2 py-1 text-xs font-bold">
          {category}
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4 flex-1">
        <div className="flex flex-wrap gap-x-2 text-[13px] mb-2 font-medium">
          <span className="bg-zinc-600 text-white px-2 py-0.5 rounded-sm">Addons</span>
          {tags.map((tag, i) => (
            <React.Fragment key={tag}>
               <span className="text-green-700 hover:underline cursor-pointer">{tag}</span>
               {i < tags.length - 1 && <span className="text-zinc-400">|</span>}
            </React.Fragment>
          ))}
        </div>
        
        <h3 className="text-lg font-bold text-zinc-800 leading-tight mb-3 hover:text-green-700 cursor-pointer">
          {title}
        </h3>
        
        <p className="text-sm text-zinc-600 line-clamp-2 mb-4">
          {description}
        </p>

      </div>
    </div>
  );
};

export default ContentCard;
