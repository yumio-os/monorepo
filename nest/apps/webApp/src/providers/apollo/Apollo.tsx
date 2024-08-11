import { createContext, JSX, useContext } from 'solid-js';

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const ApolloContext = createContext<ApolloClient<any> | undefined>(undefined);

export function ApolloProvider(props: { children: JSX.Element }): JSX.Element {
  return <ApolloContext.Provider value={client}>{props.children}</ApolloContext.Provider>;
}

// Custom hook to use the ApolloContext
export function useApollo(): ApolloClient<any> {
  const context = useContext(ApolloContext);
  if (!context) {
    throw new Error('useApollo must be used within an ApolloProvider');
  }
  return context;
}
