import 'styles/globals.css';
import Layout from 'components/layout/Layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NextEvent</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
