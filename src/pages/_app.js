import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../libs/apollo-client';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Script src="http://labelwriter.com/software/dls/sdk/js/DYMO.Label.Framework.latest.js"></Script>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
