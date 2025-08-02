import { MetadataRoute } from 'next';
import { productData } from './lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await productData();
  
  const productEntries = products.map((product) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...productEntries,
  ];
}