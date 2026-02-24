"use client";

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { rateProject, getMyRating } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface RatingInteractiveProps {
    packageId: number;
    initialRating: number;
    ratingCount?: number;
}

export default function RatingInteractive({ packageId, initialRating, ratingCount = 0 }: RatingInteractiveProps) {
    const { status } = useSession();
    const [hover, setHover] = useState(0);
    const [loading, setLoading] = useState(false);
    const [avgRating, setAvgRating] = useState(initialRating);
    const [userRating, setUserRating] = useState<number | null>(null);
    const [currentCount, setCurrentCount] = useState(ratingCount);
    const router = useRouter();

    // Lấy đánh giá của chính mình khi component mount hoặc khi session thay đổi
    React.useEffect(() => {
        if (status === 'unauthenticated') {
            setUserRating(null);
            return;
        }

        if (status === 'authenticated') {
            const fetchMyRating = async () => {
                try {
                    const result = await getMyRating(packageId);
                    if (result.success) {
                        setUserRating(result.data.rating || null);
                    }
                } catch (err) {
                    console.error("Error fetching my rating:", err);
                }
            };
            fetchMyRating();
        }
    }, [packageId, status]);

    // Đồng bộ lại khi props từ server thay đổi
    React.useEffect(() => {
        setAvgRating(initialRating);
        setCurrentCount(ratingCount);
    }, [initialRating, ratingCount]);

    const handleRate = async (rating: number) => {
        setLoading(true);
        try {
            const result = await rateProject(packageId, rating);
            if (result.success) {
                // Cập nhật ngay lập tức các giá trị trả về từ server
                const newAvg = result.data.ratingAvg || result.data.average || avgRating;
                const newCount = result.data.ratingCount || result.data.count || (userRating ? currentCount : currentCount + 1);

                setAvgRating(newAvg);
                setUserRating(rating);
                setCurrentCount(newCount);

                router.refresh();
            } else {
                alert(result.error || "Failed to submit rating");
                if (result.isUnauthorized) {
                    router.push('/login');
                }
            }
        } catch (error) {
            console.error("Rating error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Ngôi sao CHỈ sáng khi: Đang hover HOẶC Đã có đánh giá của user
    const activeRating = hover || userRating || 0;

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        disabled={loading}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => handleRate(star)}
                        className={`transition-all ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110'}`}
                    >
                        <Star
                            size={20}
                            className={`${activeRating >= star
                                ? 'text-emerald-500 fill-emerald-500' // Màu xanh khi bạn đã đánh hoặc đang chọn
                                : 'text-gray-300 dark:text-gray-600' // Màu xám khi chưa đánh
                                }`}
                        />
                    </button>
                ))}
                <div className="flex items-center ml-2 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-none">
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                        {avgRating.toFixed(1)}
                    </span>
                    <Star size={10} className="ml-1 text-orange-400 fill-orange-400" />
                </div>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-sans">
                {currentCount} {currentCount === 1 ? 'Rating' : 'Ratings'} • {userRating ? 'YOUR RECENT SCORE: ' + userRating : 'CLICK STAR TO RATE'}
            </p>
        </div>
    );
}
