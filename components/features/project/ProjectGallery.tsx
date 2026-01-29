"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface ProjectGalleryProps {
  images: string[];
  badge?: string;
}

export default function ProjectGallery({ images, badge }: ProjectGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-none shadow-sm overflow-hidden mb-6">
      <div className="relative aspect-video">
        <Image 
          src={activeImage} 
          alt="Project Screenshot" 
          fill
          className="object-cover"
        />
        {badge && (
          <div className="absolute bottom-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-none">
            {badge}
          </div>
        )}
      </div>
      <div className="flex p-4 space-x-2 overflow-x-auto">
        {images.map((img, index) => (
          <div 
            key={index}
            className={`relative w-24 h-16 rounded-none cursor-pointer transition-all overflow-hidden border-2 ${activeImage === img ? 'border-emerald-500' : 'border-transparent hover:opacity-80'}`}
            onClick={() => setActiveImage(img)}
          >
            <Image 
              src={img} 
              alt={`Thumbnail ${index + 1}`} 
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
