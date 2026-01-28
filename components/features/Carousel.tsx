"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Better 3D Beds",
      description: "Upgrade your world with better beds! Sleeker designs and enhanced visuals for cozier nights.",
      author: "RenKoMC",
      authorImage: "/icons/icon.jpg",
      category: "Texture Packs",
      image: "/next.svg", // Placeholder
    },
    // More slides could be added here
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden group h-[400px] bg-black">
      {/* Background Image / Placeholder */}
      <div className="absolute inset-0 opacity-40 bg-gradient-to-r from-black via-transparent to-black z-10" />
      <div className="absolute inset-0 flex items-center justify-center">
         <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
            {/* Using a placeholder for the background */}
            <span className="text-zinc-700 text-9xl font-bold opacity-10">MINECRAFT</span>
         </div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full mb-4 border border-zinc-700">
           <div className="w-6 h-6 rounded-full overflow-hidden border border-zinc-600">
              <Image src={currentSlide.authorImage} alt={currentSlide.author} width={24} height={24} />
           </div>
           <span className="text-sm text-zinc-300">{currentSlide.author}</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight uppercase">
          {currentSlide.title}
        </h2>
        
        <p className="text-lg text-zinc-300 max-w-2xl mb-4 italic">
          {currentSlide.description}
        </p>

        <div className="inline-block border border-zinc-500 px-4 py-1 text-sm text-zinc-400 font-medium">
          {currentSlide.category}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 text-zinc-400 hover:text-white transition-colors"
      >
        <ChevronLeft size={48} strokeWidth={1} />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 text-zinc-400 hover:text-white transition-colors"
      >
        <ChevronRight size={48} strokeWidth={1} />
      </button>

      {/* Indicators/Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 border-2 ${
              currentIndex === index ? "bg-[#45a049] border-[#45a049]" : "bg-transparent border-white"
            } transition-colors`}
          />
        ))}
      </div>

      {/* View Button - Bottom Right */}
      <div className="absolute bottom-10 right-10 z-30 hidden md:block">
        <button className="bg-[#333] hover:bg-[#444] text-white px-8 py-3 text-lg transition-colors border border-zinc-700 shadow-xl">
          View
        </button>
      </div>
    </div>
  );
};

export default Carousel;
