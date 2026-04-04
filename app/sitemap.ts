import { MetadataRoute } from 'next'
import { getPackages, getCategories } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://lflauncher.org'

    // Fetch all categories
    const categories = await getCategories()
    const categoryUrls = categories.map((cat: any) => ({
        url: `${baseUrl}/${cat.param}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }))

    // Fetch recent packages (increase limit to ensure better indexing)
    const { packages } = await getPackages(null, 1, 500)
    const packageUrls = packages.map((pkg: any) => ({
        url: `${baseUrl}/project/${pkg.slug}`,
        lastModified: new Date(pkg.updatedAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    // Add Blog Posts
    const { BLOG_POSTS } = require('@/lib/blog-data')
    const blogUrls = BLOG_POSTS.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about-us`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/android-install-guide`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/windows-install-guide`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.4,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        ...categoryUrls,
        ...packageUrls,
        ...blogUrls,
    ]
}
