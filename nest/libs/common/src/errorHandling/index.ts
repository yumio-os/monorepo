import { GraphQLError } from 'graphql';

import { ApolloServerValidationErrorCode } from '@apollo/server/errors';

import { handle400Error } from './400';
import { handle403Error } from './403';

export * from './400';
export * from './401';
export * from './403';
export * from './500';

export function handleError(err: any) {
  if (err?.extensions?.response?.status) {
    switch (err.extensions.response.status) {
      case 400:
        handle400Error(err);
        break;
      case 403:
      case '403':
        handle403Error(err);
        break;
    }
  }
  // unkown Internal Server Error
  throw new Error(err);
}

export function validationError(message: string) {
  throw new GraphQLError(message, {
    extensions: {
      code: ApolloServerValidationErrorCode,
    },
  });
}
