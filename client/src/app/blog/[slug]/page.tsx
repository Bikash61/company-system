import { getPostBySlug } from '@/services/api';
import sanitizeHtml from 'sanitize-html';
import Image from 'next/image';
import type { Metadata } from 'next';

// Revalidate every hour
export const revalidate = 3600;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    return {
      title: `${post.title} | Austere-Analytics Blog`,
      description: post.excerpt || 'Read this article on the Austere-Analytics blog.',
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.imageUrl ? [{ url: post.imageUrl }] : [],
        type: 'article',
      },
    };
  } catch {
    return { title: 'Blog | Austere-Analytics' };
  }
}

const BlogPostPage = async ({ params }: Props) => {
  const post = await getPostBySlug(params.slug);

  const safeContent = sanitizeHtml(post.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'h1', 'h2', 'h3', 'h4', 'img', 'figure', 'figcaption', 'iframe',
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title', 'width', 'height', 'class'],
      iframe: ['src', 'allowfullscreen', 'frameborder', 'width', 'height'],
      '*': ['class'],
    },
    allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
  });

  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">{post.category || 'General'}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
        <p className="mt-6 text-xl leading-8">{post.excerpt}</p>
        <div className="mt-10 max-w-2xl">
            <div className="relative mt-8 flex items-center gap-x-4">
                <Image
                  src={post.author?.imageUrl || 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                  alt={post.author?.name || 'Author'}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full bg-gray-100"
                />
                <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                        {post.author?.name || 'Anonymous'}
                    </p>
                    <p className="text-gray-600">{post.author?.role || 'Contributor'}</p>
                </div>
            </div>
            <div className="mt-4 flex items-center gap-x-4 text-xs">
                <time dateTime={post.createdAt} className="text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                </time>
            </div>
          <div className="prose lg:prose-xl max-w-none mt-10">
            <div dangerouslySetInnerHTML={{ __html: safeContent }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
