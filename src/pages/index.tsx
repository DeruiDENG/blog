import Layout from '../components/Layout';
import SEO from '../components/seo';
import Pagination from '../components/Pagination';
import Bio from '../components/Bio';
import styles from '../styles/pages/PostList.module.scss';
import Link from 'next/link';
import { getAllPosts } from '../utils/api/posts';

const Home = () => {
  const totalPages = 15;
  const pageIndex = 0;
  const posts = getAllPosts();

  return (
    <Layout isHomePage>
      <SEO title="All posts" />
      {pageIndex === 0 && <Bio />}
      {posts.map(({ title, slug, excerpt, date }, index) => {
        return (
          <article className={styles.blog} key={index}>
            <header className={styles.blog__header}>
              <Link href={`/posts/${decodeURI(slug)}`} passHref>
                <a>
                  <h2 className={styles.blog__title}>{title}</h2>
                  <small className={styles.blog__subTitle}>{date}</small>
                  <section className={styles.blog__excerpt}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: excerpt,
                      }}
                    />
                  </section>
                </a>
              </Link>
            </header>
          </article>
        );
      })}
      <Pagination current={pageIndex} total={totalPages} />
    </Layout>
  );
};

export default Home;
