import Layout from '../components/Layout';
import Bio from '../components/Bio';
import Pagination from '../components/Pagination';
import styles from '../styles/pages/PostList.module.scss';
import Link from 'next/link';
import { getPaginatedPosts } from '../utils/api/posts';

export default function Home() {
  const { posts, totalPages, currentPage } = getPaginatedPosts(1, 5);

  return (
    <Layout isHomePage>
      <Bio />
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

