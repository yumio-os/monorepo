import { fieldExtensionsEstimator, getComplexity, simpleEstimator } from 'graphql-query-complexity';

import { ApolloServerPlugin, GraphQLRequestContextWillSendResponse } from '@apollo/server';

export class ComplexityPlugin implements ApolloServerPlugin {
  private readonly maxComplexity: number;

  constructor(maxComplexity: number = 1000) {
    this.maxComplexity = ['prod', 'production'].includes(process.env['ACTIVE_PROFILE'])
      ? 400
      : maxComplexity;
  }

  requestDidStart(requestContext: GraphQLRequestContextWillSendResponse<any>): any {
    return {
      didResolveOperation: async ({ request, document, schema }) => {
        // Now accessing the schema directly from the context
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [fieldExtensionsEstimator(), simpleEstimator({ defaultComplexity: 1 })],
        });

        (<any>requestContext).complexity = complexity;
        (<any>requestContext).contextValue.complexity = complexity;

        // DO NOT THROW ATM, WE ARE IN LEARNING STAGE
        if (complexity > this.maxComplexity) {
          throw new Error(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${this.maxComplexity}`,
          );
        }
      },
    };
  }
}
