import React from 'react';

import Head from 'next/head';
import { AppProps } from 'next/app';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import { ApolloProvider } from '@apollo/client';

import { theme } from '@orochizu-workspace/ui/theme';
import {
  firebaseInit,
  FirebaseProvider,
} from '@orochizu-workspace/data-access/firebase/client';

import Layout from '../components/commons/Layout';

import config from '../_certs/blogify-firebase-config.json';
import '../styles.css';
import { useApollo } from '@orochizu-workspace/data-access/graphql/client';

function App(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;
  const client = useApollo(pageProps.initialApolloState);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Welcome to web-app!</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>
          <FirebaseProvider value={firebaseInit(config)}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </FirebaseProvider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
