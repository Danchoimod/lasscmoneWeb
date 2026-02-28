'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}

const Pagination = ({ currentPage, totalPages, onPageChange, isLoading }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) {
                    // Add a safety check for duplicates
                    if (pages[pages.length - 1] !== i) {
                        pages.push(i);
                    }
                }
            }

            if (currentPage < totalPages - 2) {
                if (pages[pages.length - 1] !== '...') pages.push('...');
            }
            if (!pages.includes(totalPages)) pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-1.5 mt-10">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className="h-10 w-10 flex items-center justify-center border border-zinc-200 bg-white hover:border-black transition-all disabled:opacity-20 disabled:cursor-not-allowed group"
            >
                <ChevronLeft className="w-4 h-4 text-zinc-400 group-hover:text-black" />
            </button>

            <div className="flex items-center gap-1.5">
                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`dots-${index}`} className="w-8 text-center text-zinc-300 font-bold select-none cursor-default">···</span>
                    ) : (
                        <button
                            key={`page-${page}`}
                            onClick={() => onPageChange(page as number)}
                            disabled={isLoading}
                            className={`w-10 h-10 text-[11px] font-black tracking-tighter transition-all border ${currentPage === page
                                    ? 'bg-zinc-900 border-zinc-900 text-white'
                                    : 'bg-white border-zinc-200 text-zinc-400 hover:border-black hover:text-black'
                                }`}
                        >
                            {String(page).padStart(2, '0')}
                        </button>
                    )
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                className="h-10 w-10 flex items-center justify-center border border-zinc-200 bg-white hover:border-black transition-all disabled:opacity-20 disabled:cursor-not-allowed group"
            >
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-black" />
            </button>
        </div>
    );
};

export default Pagination;
