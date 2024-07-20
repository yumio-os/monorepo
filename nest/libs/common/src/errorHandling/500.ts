import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';

export function handle500Error(response?: any) {
  throw new GraphQLError('Internal Server Error', {
    extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
  });
}
