import { createContext, JSX, useContext } from 'solid-js';

import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { useAuth } from '../auth/Auth';

const ApolloContext = createContext<ApolloClient<any> | undefined>(undefined);

export function ApolloProvider(props: { children: JSX.Element }): JSX.Element {
  const { authState, setAuthState } = useAuth(); // Get auth state and setter

  // Middleware link to add the Authorization header
  const authLink = new ApolloLink((operation, forward) => {
    const bearer = authState()?.bearer;

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: bearer ? `Bearer ${bearer}` : '',
      },
    }));

    return forward(operation);
  });

  // Error handling link to detect unauthorized access
  const errorLink = onError(({ graphQLErrors, networkError, response }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors);
      for (const err of graphQLErrors ?? []) {
        if (err?.extensions?.code === 'UNAUTHENTICATED' || err?.message?.includes?.('Unauthorized')) {
          // Log out the user by clearing the auth state
          setAuthState({ isAuthenticated: false, user: null });
          return;
        }
      }
    } else if (networkError && 'statusCode' in networkError && networkError.statusCode === 403) {
      // Handle HTTP 401 Unauthorized errors
      setAuthState({ isAuthenticated: false, user: null });
      // return;
    } else if (response && (response as any).status === 403) {
      // Handle response with status code 401
      setAuthState({ isAuthenticated: false, user: null });
    } else if (networkError && 'statusCode' in networkError && networkError.statusCode === 401) {
      // Handle HTTP 401 Unauthorized errors
      setAuthState({ isAuthenticated: false, user: null });
    } else if (response && (response as any).status === 401) {
      // Handle response with status code 401
      setAuthState({ isAuthenticated: false, user: null });
    }
  });

  // HTTP link for making requests to the GraphQL server
  const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URI || 'http://localhost:4000', // Replace with your GraphQL server URI
    // credentials: 'include', // Include cookies or credentials if needed
  });

  // Combine the links: authLink -> errorLink -> httpLink
  const link = from([authLink, errorLink, httpLink]);

  // Create the Apollo Client instance with the combined link and cache
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

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
