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

    // Fetch recent packages (we might need all, but let's start with a decent amount)
    const { packages } = await getPackages(null, 1)
    const packageUrls = packages.map((pkg: any) => ({
        url: `${baseUrl}/project/${pkg.slug}`,
        lastModified: new Date(pkg.updatedAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/about-us`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        ...categoryUrls,
        ...packageUrls,
    ]
}
