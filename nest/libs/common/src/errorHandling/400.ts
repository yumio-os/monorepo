import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';

export function handle400Error(error: any) {
  throw new GraphQLError(error?.extensions?.response?.body?.message, {
    extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
  });
}
