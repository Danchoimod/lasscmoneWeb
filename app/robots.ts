import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/packages', '/api/users', '/auth/', '/profile/', '/search'],
        },
        sitemap: 'https://lflauncher.org/sitemap.xml',
    }
}
