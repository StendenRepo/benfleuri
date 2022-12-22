import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../libs/apollo-client';

function MyApp({ Component, pageProps }) {
  return;
  <ApolloProvider client={apolloClient}>
    <Component {...pageProps} />
  </ApolloProvider>;
}

export default MyApp;
