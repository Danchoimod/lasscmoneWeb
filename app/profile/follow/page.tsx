'use client';

import React, { useState, useEffect } from 'react';
import { getFollowing } from '@/lib/actions';
import Link from 'next/link';
import Image from 'next/image';

// Định nghĩa kiểu cho SectionHeading
interface SectionHeadingProps {
  children: React.ReactNode;
}

const SectionHeading = ({ children }: SectionHeadingProps) => (
  <div className="mb-6 border-b-2 border-gray-800 pb-2">
    <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight italic">{children}</h2>
  </div>
);

interface FollowingUser {
  id: number;
  avatar: string;
  displayname: string;
  slug: string;
}

export default function FollowPage() {
  const [followedUsers, setFollowedUsers] = useState<FollowingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        setLoading(true);
        const result = await getFollowing();
        if (result.success) {
          setFollowedUsers(result.data || []);
        } else {
          setError(result.error || "Failed to load following list");
        }
      } catch (err) {
        setError("An error occurred while fetching following list");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-20 flex justify-center items-center h-full border border-gray-300">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 border border-gray-300 rounded-none transition-none">
      <SectionHeading>My Following</SectionHeading>

      {followedUsers.length === 0 && !error ? (
        <div className="text-center py-10 bg-gray-50 border border-dashed border-gray-300">
          <p className="text-gray-400 italic text-sm">You are not following anyone yet.</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-red-50 border border-red-100 text-red-500">
          <p className="text-sm font-bold">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {followedUsers.map((user) => (
            <Link
              key={user.id}
              href={`/user/${user.slug}`}
              className="border border-gray-300 rounded-none flex flex-col cursor-pointer group bg-gray-50 transition-none"
            >
              {/* Ảnh đại diện - Cạnh sắc (Square) */}
              <div className="aspect-square bg-gray-200 flex items-center justify-center relative overflow-hidden border-b border-gray-300 rounded-none">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.displayname}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 group-hover:bg-gray-400 transition-none" />
                )}

                {/* Overlay: Nút View Profile vuông vức */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition-none">
                  <span className="text-[10px] uppercase font-bold text-gray-800 bg-white border border-gray-800 px-3 py-1.5 rounded-none shadow-none">
                    View Profile
                  </span>
                </div>
              </div>

              {/* Khối thông tin người dùng */}
              <div className="p-3 bg-white rounded-none">
                <span className="font-bold text-xs text-gray-800 truncate block group-hover:text-green-700 transition-none">
                  {user.displayname}
                </span>
                <span className="text-[10px] text-gray-400 font-medium uppercase mt-1 block">
                  Member
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
