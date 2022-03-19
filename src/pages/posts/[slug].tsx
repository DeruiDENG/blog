import Layout from '../../components/Layout';
import SEO from '../../components/seo';
import styles from '../../styles/pages/Post.module.scss';
import { Comments } from '../../components/Comment';
import Link from 'next/link';

interface Post {
  title: string;
  excerpt: string;
  html: string;
  date: string;
  description: string;
}

const Post = () => {
  const post: Post = {
    title: 'Post Title',
    excerpt: 'Post excerpt',
    html: 'Post content',
    date: '2022-03-19',
    description: 'Post description',
  };

  const next = {
    slug: 'next',
  };

  const previous = {
    slug: 'previous',
  };

  return (
    <Layout>
      <SEO title={post.title} description={post.description} />
      <article>
        <header>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.info}>
            {new Date(post.date).toLocaleDateString()}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: '1.75rem',
          }}
        />
        <Comments />
      </article>
      <nav>
        <ul className={styles.navigator}>
          <li>{next && <Link href={next.slug}>← Newer</Link>}</li>
          <li>{previous && <Link href={previous.slug}>Older →</Link>}</li>
        </ul>
      </nav>
    </Layout>
  );
};

export default Post;
