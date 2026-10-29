import Layout from '../../../components/Layout';
import Pagination from '../../../components/Pagination';
import styles from '../../../styles/pages/PostList.module.scss';
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
      {posts.map(({ title, slug, excerpt, date }) => {
        const formattedDate = date ? new Date(date).toLocaleDateString('zh-CN') : '';
        return (
          <article className={styles.blog} key={slug}>
            <header className={styles.blog__header}>
              <h2 className={styles.blog__title}>
                <Link href={`/posts/${encodeURIComponent(slug)}`}>
                  {title}
                </Link>
              </h2>
              {formattedDate && (
                <small className={styles['blog__sub-title']}>{formattedDate}</small>
              )}
            </header>
            <section className={styles.blog__excerpt}>
              <p>{excerpt}</p>
            </section>
          </article>
        );
      })}
      <Pagination current={currentPage} total={totalPages} />
    </Layout>
  );
}

