import { client } from '@/lib/apollo-client';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
