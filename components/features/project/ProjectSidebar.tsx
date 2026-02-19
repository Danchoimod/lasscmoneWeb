import React from 'react';
import { Download, Heart, CheckCircle, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

interface ProjectSidebarProps {
  title: string;
  category: string;
  event?: string;
  creator: {
    name: string;
    slug: string;
    avatar: string;
    verified?: boolean;
  };
  stats: {
    version: string;
    lastUpdated: string;
    downloads: string;
    rating: number;
  };
  tags: string[];
  otherFromCreator: {
    name: string;
    image: string;
    downloads: string;
  }[];
}

export default function ProjectSidebar({
  title,
  category,
  event,
  creator,
  stats,
  tags,
  otherFromCreator
}: ProjectSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Main Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-none shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          {event && <span className="text-emerald-500 font-semibold">{event}</span>}
          {event && <span>•</span>}
          <span>{category}</span>
        </div>

        <div className="space-y-4">
          <Button className="w-full flex items-center justify-center space-x-2 py-3">
            <Download className="w-5 h-5" />
            <span>DOWNLOAD MOD</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center space-x-2 py-3">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Add to Wishlist</span>
          </Button>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Created by</span>
            <Link href={`/user/${creator.slug}`} className="flex items-center space-x-2 group/creator hover:opacity-80 transition-opacity">
              <span className="text-sm font-semibold group-hover/creator:text-emerald-500 transition-colors">{creator.name}</span>
              {creator.verified && <CheckCircle className="w-3 h-3 text-blue-500" />}
              <div className="relative w-6 h-6 rounded-none overflow-hidden border border-gray-200 group-hover/creator:border-emerald-500 transition-colors">
                <Image src={creator.avatar} alt={creator.name} fill className="object-cover" />
              </div>
            </Link>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Version</span>
            <span className="font-medium">{stats.version}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Last Updated</span>
            <span className="font-medium">{stats.lastUpdated}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Downloads</span>
            <span className="font-medium">{stats.downloads}</span>
          </div>
          <div className="flex justify-between items-center py-3 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Rating</span>
            <div className="flex items-center text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-none">
              <span className="font-bold mr-1">{stats.rating}</span>
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>
        </div>
      </div>

      {/* Tags Card */}
      <div className="bg-white dark:bg-gray-800 rounded-none shadow-sm p-6">
        <h3 className="font-bold mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-none text-xs font-medium hover:bg-emerald-500 hover:text-white cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Other from Creator Card */}
      <div className="bg-white dark:bg-gray-800 rounded-none shadow-sm p-6">
        <h3 className="font-bold mb-4">Other from {creator.name}</h3>
        <div className="space-y-4">
          {otherFromCreator.map((item, index) => (
            <a key={index} href="#" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 rounded-none overflow-hidden flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold group-hover:text-emerald-500 transition-colors line-clamp-1">{item.name}</p>
                <p className="text-xs text-gray-500">{item.downloads} Downloads</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
