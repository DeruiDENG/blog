import Layout from '../../../components/Layout';
import Pagination from '../../../components/Pagination';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getAllPosts, getPaginatedPosts } from '../../../utils/api/posts';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ page: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `All posts - Page ${page}`,
  };
}

export function generateStaticParams() {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / 5);
  const params: { page: string }[] = [];
  for (let i = 2; i <= totalPages; i++) {
    params.push({ page: i.toString() });
  }
  return params;
}

export default async function PaginatedPage({ params }: Props) {
  const { page: rawPage } = await params;
  const pageNum = parseInt(rawPage, 10);

  if (isNaN(pageNum) || pageNum < 1) {
    notFound();
  }

  if (pageNum === 1) {
    redirect('/');
  }

  const { posts, totalPages, currentPage } = getPaginatedPosts(pageNum, 5);

  if (pageNum > totalPages) {
    notFound();
  }

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-6 mb-12">
        {posts.map(({ title, slug, excerpt, date }) => {
          const formattedDate = date ? new Date(date).toLocaleDateString('zh-CN') : '';
          return (
            <article
              key={slug}
              className="group relative p-5 sm:p-6 -mx-3 sm:mx-0 rounded-2xl transition-all duration-200 hover:bg-white dark:hover:bg-zinc-900/90 hover:shadow-md hover:border-zinc-200/80 dark:hover:border-zinc-800 border border-transparent"
            >
              <header className="mb-2">
                {formattedDate && (
                  <time className="inline-flex items-center text-xs font-semibold text-zinc-400 dark:text-zinc-500 mb-1.5 tracking-wider uppercase">
                    {formattedDate}
                  </time>
                )}
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <Link href={`/posts/${encodeURIComponent(slug)}`}>
                    {title}
                  </Link>
                </h2>
              </header>
              <section className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed line-clamp-3">
                <p>{excerpt}</p>
              </section>
              <div className="mt-3.5 inline-flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                <span>阅读全文</span>
                <svg
                  className="w-3.5 h-3.5 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </article>
          );
        })}
      </div>
      <Pagination current={currentPage} total={totalPages} />
    </Layout>
  );
}
