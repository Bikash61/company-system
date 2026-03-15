import { getPosts } from '@/services/api';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import PaginationControls from '@/components/PaginationControls';

export const metadata: Metadata = {
  title: 'Blog | Austere-Analytics',
  description: 'Articles and insights on web development, AI, and technology from the Austere-Analytics team.',
};

export const revalidate = 0;

interface BlogPostAuthor {
  name?: string;
  imageUrl?: string;
  role?: string;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  category?: string;
  createdAt: string;
  author?: BlogPostAuthor;
}

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  const { page: pageParam } = await searchParams;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const { data: posts, totalPages } = await getPosts(currentPage, 6);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">From the blog</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Articles and news from our team
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Stay up to date with the latest trends in technology and business.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post: BlogPost) => (
            <article key={post._id} className="flex flex-col items-start justify-between">
              <div className="relative w-full">
                <Image
                  src={post.imageUrl || 'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3603&q=80'}
                  alt={post.title}
                  width={800}
                  height={450}
                  className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.createdAt} className="text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </time>
                  <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                    {post.category || 'General'}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <Image src={post.author?.imageUrl || 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt={post.author?.name || 'Author'} width={40} height={40} className="h-10 w-10 rounded-full bg-gray-100" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      {post.author?.name || 'Anonymous'}
                    </p>
                    <p className="text-gray-600">{post.author?.role || 'Contributor'}</p>
                  </div>
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
};

export default BlogPage;
