import { ReactNode } from 'react';
import Link from 'next/link';
import styles from './Layout.module.scss';
import { siteTitle } from '../utils/meta';

interface Props {
  isHomePage?: boolean;
  children: ReactNode;
}

const Layout = ({ isHomePage, children }: Props) => {
  return (
    <div className={styles.site}>
      <header>
        <h1
          className={`${styles.siteHeader} ${isHomePage ? '' : styles.smaller}`}
        >
          <Link href="/">{siteTitle}</Link>
        </h1>
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, built with
        {` `}
        <a href="https://nextjs.org/">NextJs</a>
      </footer>
    </div>
  );
};

export default Layout;
