import { getPostBySlug } from '@/services/api';

// Revalidate every hour
export const revalidate = 3600;

type Props = {
  params: {
    slug: string;
  };
};

const BlogPostPage = async ({ params }: Props) => {
  const post = await getPostBySlug(params.slug);

  return (
    <article>
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-6">
        By {post.author?.name || 'Anonymous'} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="prose lg:prose-xl max-w-none">
        {/* In a real app, you would sanitize this HTML or render from Markdown */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  );
};

export default BlogPostPage;
