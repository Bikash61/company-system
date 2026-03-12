// src/app/portfolio/page.tsx
import { getPortfolioItems } from '@/services/api';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import PaginationControls from '@/components/PaginationControls';

export const metadata: Metadata = {
  title: 'Portfolio | Austere-Analytics',
  description: 'Explore our portfolio of web, mobile, and AI projects delivered for clients worldwide.',
};

interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  tags: string[];
}

interface PortfolioPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const { data: portfolioItems, totalPages } = await getPortfolioItems(currentPage, 6);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Portfolio</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            A showcase of our best work
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We take pride in the solutions we deliver. Explore our portfolio to see the quality and diversity of our work.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {portfolioItems.map((item: PortfolioItem) => (
            <article key={item._id} className="flex flex-col items-start justify-between">
              <div className="relative w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={500}
                  height={300}
                  className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mb-4 mt-8">
                    {item.tags.map((tag: string) => (
                    <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #{tag}
                    </span>
                    ))}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    {item.projectUrl ? (
                        <Link href={item.projectUrl} target="_blank" rel="noopener noreferrer">
                            <span className="absolute inset-0" />
                            {item.title}
                        </Link>
                    ) : (
                        item.title
                    )}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <Suspense>
          <PaginationControls currentPage={currentPage} totalPages={totalPages} />
        </Suspense>
      </div>
    </div>
  );
}
