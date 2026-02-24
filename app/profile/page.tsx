import React from 'react';
import { getMe } from '@/lib/actions';
import { redirect } from 'next/navigation';
import ProfileClient from './ProfileClient';

export default async function ProfilePage() {
  const result = await getMe();

  if (!result.success) {
    if (result.isUnauthorized) {
      redirect('/login');
    }
    return (
      <div className="bg-white p-12 border border-gray-200 text-center">
        <p className="text-red-500 font-bold mb-4">{result.error}</p>
        <a
          href="/profile"
          className="bg-gray-800 text-white px-6 py-2 text-xs font-bold uppercase tracking-widest inline-block"
        >
          Try Again
        </a>
      </div>
    );
  }

  return <ProfileClient initialData={result.data} />;
}
