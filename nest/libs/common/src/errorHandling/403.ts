import { GraphQLError } from 'graphql';

// 403
export function handle403Error(response?: any) {
  // throw new AuthenticationError('You must be logged in', { exception: { status: 403 } });
  throw new GraphQLError('You must be logged in', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  });
}

export function handle403ApiKeySiteError(response?: any) {
  throw new GraphQLError('ApiKey not allowed to access contenn', {
    extensions: {
      code: 'FORBIDDEN',
    },
  });
}
