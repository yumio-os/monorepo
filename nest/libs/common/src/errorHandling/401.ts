import { GraphQLError } from 'graphql';

// 401
export function handle401Error(response?: any) {
  throw new GraphQLError('You must be logged in', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  });
}
