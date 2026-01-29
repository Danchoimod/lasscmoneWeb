import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ProjectBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function ProjectBreadcrumbs({ items }: ProjectBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex mb-4 text-sm text-gray-500 dark:text-gray-400">
      <ol className="inline-flex items-center space-x-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-1" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-emerald-500 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 dark:text-gray-200">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
