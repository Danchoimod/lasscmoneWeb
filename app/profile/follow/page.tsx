import React from 'react';
import { getFollowing } from '@/lib/actions';
import FollowClient from './FollowClient';

export default async function FollowPage() {
  const result = await getFollowing();

  if (!result.success) {
    return (
      <div className="bg-white p-8 border border-gray-300 rounded-none text-center">
        <p className="text-red-500 font-bold mb-4">{result.error || "Failed to load following list"}</p>
        <a
          href="/profile/follow"
          className="bg-gray-800 text-white px-6 py-2 text-xs font-bold uppercase tracking-widest inline-block"
        >
          Try Again
        </a>
      </div>
    );
  }

  return <FollowClient initialData={result.data || []} />;
}
