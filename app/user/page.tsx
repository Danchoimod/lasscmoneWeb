"use client";

import React from "react";
import Image from "next/image";
import { UserPlus, Calendar, Box, ShieldCheck } from "lucide-react";
import ContentCard from "@/components/features/ContentCard";

const UserProfilePage = () => {
  // Sử dụng ảnh mặc định /next.svg
  const defaultImg = "/next.svg";

  const userData = {
    name: "Alex Minecraft Builder",
    avatar: "/icons/icon.jpg",
    joinDate: "January 2024",
    submissionsCount: 8,
    isVerified: true,
  };

  // Tạo mảng 8 bài viết với ảnh mặc định
  const userSubmissions = Array(3).fill(null).map((_, index) => ({
    id: `submission-${index}`,
    author: userData.name,
    authorAvatar: userData.avatar,
    rating: 4.8,
    date: "2 days ago",
    thumbnail: defaultImg, // Dùng ảnh mặc định cho thumbnail
    category: "Maps",
    tags: ["Survival", "Hardcore"],
    title: "Epic Skyblock Survival Challenge v2.0",
    description: "A custom skyblock map with over 50+ unique islands and custom trading systems for a better experience.",
  }));

  return (
    <div className="">
      {/* 1. Profile Header Section */}
      <div className="bg-white border-b border-zinc-200 pt-12 pb-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-6">

          {/* Avatar - Dùng ảnh local next.svg */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 bg-zinc-100 border-4 border-white shadow-lg rounded-sm overflow-hidden -mb-4 flex items-center justify-center p-4">
            <Image
              src={userData.avatar}
              alt={userData.name}
              width={160}
              height={160}
              className="object-contain"
            />
          </div>

          {/* Thông tin User */}
          <div className="flex-1 flex flex-col items-center md:items-start pb-2">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
                {userData.name}
              </h1>
              {userData.isVerified && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-zinc-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Joined {userData.joinDate}
              </div>
              <div className="flex items-center gap-1.5">
                <Box className="w-4 h-4" />
                {userData.submissionsCount} submissions
              </div>
            </div>
          </div>

          {/* Nút Follow */}
          <div className="flex gap-3 pb-2">
            <button className="flex items-center gap-2 bg-[#4CAF50] hover:bg-green-600 text-white px-6 py-2.5 font-bold uppercase text-sm transition-colors shadow-sm active:scale-95">
              <UserPlus className="w-4 h-4" />
              follow
            </button>
          </div>
        </div>
      </div>

      {/* 2. Submissions Grid Section */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <div className="flex items-center justify-between mb-8 border-b border-zinc-200 pb-4">
          <h2 className="text-xl font-black uppercase tracking-widest text-zinc-800">
            user submissions
          </h2>
          <span className="bg-zinc-800 text-white text-xs px-3 py-1 font-bold">
            8 items
          </span>
        </div>

        {/* Lưới hiển thị các Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userSubmissions.map((item, index) => (
            <ContentCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;