import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.scss';
import { SessionProvider } from 'next-auth/react';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <>
      <Head>
        <title>expensio | Your favourite expense tracker</title>
      </Head>
      <main className="app font-content">
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </main>
    </>
  );
};

export default App;
