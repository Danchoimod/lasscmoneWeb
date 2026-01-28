"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

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
}: ContentCardProps) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-sm overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow h-full">
      
      {/* 1. Thumbnail */}
      <div className="relative aspect-video w-full bg-zinc-100">
        <Image src={thumbnail} alt={title} fill className="object-cover" />
        
        {/* Đã chuyển sang góc trái (left-0) */}
        <div className="absolute bottom-0 left-0 bg-[#4CAF50] text-white px-2 py-1 text-xs font-bold uppercase">
          {category}
        </div>
      </div>

      {/* 2. Content Body */}
      <div className="p-4 flex-1">
        <div className="flex flex-wrap gap-x-2 text-[12px] mb-2 font-medium">
          {tags.map((tag, i) => (
            <React.Fragment key={tag}>
              <span className="text-green-700 hover:underline cursor-pointer">{tag}</span>
              {i < tags.length - 1 && <span className="text-zinc-300">|</span>}
            </React.Fragment>
          ))}
        </div>
        
        <h3 className="text-lg font-bold text-zinc-800 leading-tight mb-2 hover:text-green-700 cursor-pointer transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-zinc-600 line-clamp-2">
          {description}
        </p>
      </div>

      {/* 3. Footer Info */}
      <div className="px-4 py-3 border-t border-zinc-100 bg-zinc-50/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-zinc-200">
            <Image src={authorAvatar} alt={author} width={32} height={32} className="object-cover" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-[#3b82f6] font-bold text-[13px] leading-none">By {author}</span>
              <div className="w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                <span className="text-[7px] text-white font-black">✓</span>
              </div>
            </div>
            <span className="text-[10px] text-zinc-500 mt-0.5">{date}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-white border border-zinc-200 px-2 py-1 rounded-sm shadow-sm">
          <span className="font-bold text-zinc-700 text-sm leading-none">{rating}</span>
          <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
        </div>
      </div>
    </div>
  );
};

export default ContentCard;