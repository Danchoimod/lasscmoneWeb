"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface CarouselItem {
  title: string;
  summary: string;
  imageUrl: string;
  category: {
    id: number;
    name: string;
  };
  user: {
    avatar: string;
    username: string;
    slug: string;
  };
  package: {
    id: number;
    slug: string;
  } | null;
}

interface CarouselProps {
  initialSlides: CarouselItem[];
}

const Carousel = ({ initialSlides }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides] = useState<CarouselItem[]>(initialSlides);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-play feature
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [slides.length, currentIndex]);

  if (slides.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto h-[400px] bg-zinc-900 animate-pulse flex items-center justify-center">
        <span className="text-zinc-700 text-6xl font-bold opacity-10">MINECRAFT</span>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden group h-[400px] bg-black">
      {/* Background Images with Cross-fade */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="w-full h-full bg-zinc-900 flex items-center justify-center relative overflow-hidden">
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                fill
                className="object-cover opacity-50"
                priority={index === 0}
              />
              <span className="absolute text-zinc-700 text-9xl font-bold opacity-10 select-none">MINECRAFT</span>
            </div>
          </div>
        ))}
        {/* Unified Gradient Overlay */}
        <div className="absolute inset-0 opacity-40 bg-gradient-to-r from-black via-transparent to-black z-10" />
      </div>

      {/* Content with Animation */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute flex flex-col items-center transition-all duration-700 ease-out ${index === currentIndex
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
              }`}
          >
            <Link
              href={`/user/${slide.user.slug}`}
              className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full mb-4 border border-zinc-700 hover:border-zinc-500 transition-colors"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden border border-zinc-600">
                <Image src={slide.user.avatar || "/icons/icon.jpg"} alt={slide.user.username} width={24} height={24} />
              </div>
              <span className="text-sm text-zinc-300">{slide.user.username}</span>
            </Link>

            {slide.package ? (
              <Link href={`/project/${slide.package.slug}`}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight uppercase hover:text-green-500 transition-colors">
                  {slide.title}
                </h2>
              </Link>
            ) : (
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight uppercase">
                {slide.title}
              </h2>
            )}

            <p className="text-lg text-zinc-300 max-w-2xl mb-4 italic">
              {slide.summary}
            </p>

            <div className="inline-block border border-zinc-500 px-4 py-1 text-sm text-zinc-400 font-medium">
              {slide.category.name}
            </div>
          </div>
        ))}
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
            className={`w-4 h-4 border-2 transition-all duration-300 ${currentIndex === index ? "bg-[#45a049] border-[#45a049]" : "bg-transparent border-white"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
