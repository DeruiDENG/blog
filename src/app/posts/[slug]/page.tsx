import Layout from '../../../components/Layout';
import Comments from '../../../components/Comment';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostData } from '../../../utils/api/posts';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description || post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.date ? new Date(post.date).toLocaleDateString('zh-CN') : '';

  return (
    <Layout>
      <article>
        <header className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight mb-3">
            {post.title}
          </h1>
          {formattedDate && (
            <time className="inline-block text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {formattedDate}
            </time>
          )}
        </header>

        <section
          className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline prose-pre:p-0 prose-pre:bg-transparent prose-img:rounded-xl prose-img:shadow-sm"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <hr className="my-10 border-t border-zinc-200 dark:border-zinc-800" />

        <Comments />
      </article>

      <nav
        className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800"
        aria-label="Post navigation"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {post.prevPost ? (
            <Link
              href={`/posts/${encodeURIComponent(post.prevPost.slug)}`}
              className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-900 hover:border-indigo-500/50 hover:shadow-sm transition-all"
            >
              <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mb-1 flex items-center gap-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                <span>← 上一篇</span>
              </div>
              <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {post.prevPost.title}
              </div>
            </Link>
          ) : (
            <div />
          )}

          {post.nextPost ? (
            <Link
              href={`/posts/${encodeURIComponent(post.nextPost.slug)}`}
              className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-900 hover:border-indigo-500/50 hover:shadow-sm transition-all text-right"
            >
              <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mb-1 flex items-center justify-end gap-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                <span>下一篇 →</span>
              </div>
              <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {post.nextPost.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>
    </Layout>
  );
}
