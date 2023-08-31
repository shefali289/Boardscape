import Head from 'next/head';
import Header from './Header.js';
import Footer from './Footer';
import styles from '../styles/Layout.module.css';

const Layout = ({
  title, keywords, description, children,
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Head>

    <Header />

    <div className={styles.container}>{children}</div>
    <Footer />
  </div>
);

Layout.defaultProps = {
  title: 'Boardscape | Find the hottest boardgames',
  description: 'Find the latest boardgame events',
  keywords: 'boardgames, games, fun, events',
};

export default Layout;
