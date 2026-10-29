import Layout from '../components/Layout';
import Bio from '../components/Bio';
import Pagination from '../components/Pagination';
import Link from 'next/link';
import { getPaginatedPosts } from '../utils/api/posts';

export default function Home() {
  const { posts, totalPages, currentPage } = getPaginatedPosts(1, 5);

  return (
    <Layout isHomePage>
      <Bio />
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
