import Layout from '../../../components/Layout';
import styles from '../../../styles/pages/Post.module.scss';
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
        <header>
          <h1 className={styles.title}>{post.title}</h1>
          {formattedDate && <p className={styles.info}>{formattedDate}</p>}
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: '1.75rem',
            marginTop: '2rem',
            border: 'none',
            borderTop: '1px solid #e0e0e0',
          }}
        />
        <Comments />
      </article>
      <nav>
        <ul className={styles.navigator}>
          <li>
            {post.prevPost && (
              <Link href={`/posts/${encodeURIComponent(post.prevPost.slug)}`}>
                ← {post.prevPost.title}
              </Link>
            )}
          </li>
          <li>
            {post.nextPost && (
              <Link href={`/posts/${encodeURIComponent(post.nextPost.slug)}`}>
                {post.nextPost.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
}

