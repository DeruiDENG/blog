import Layout from '../components/Layout';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Layout>
      <h1>404 - Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <p style={{ marginTop: '1.5rem' }}>
        <Link href="/">← Back to home</Link>
      </p>
    </Layout>
  );
}

