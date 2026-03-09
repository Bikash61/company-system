// src/app/portfolio/page.tsx
import { getPortfolioItems } from '@/services/api';
import Image from 'next/image';
import Link from 'next/link';

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolioItems();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Our Work</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image src={item.imageUrl} alt={item.title} width={500} height={300} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <div className="mb-4">
                {item.tags.map((tag) => (
                  <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #{tag}
                  </span>
                ))}
              </div>
              {item.projectUrl && (
                <Link href={item.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  View Project
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
