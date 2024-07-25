import { ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestContextWillSendResponse, GraphQLRequestListener } from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import { Logger } from '@nestjs/common';
import { hrtimeParseToMiliSec, hrtimeParseToString } from '@yumio/common';
import { ApiKey } from '@yumio/modules/apiKey/model';

export function cleanApiKey(apiKeyDetails: ApiKey) {
  if (!apiKeyDetails) {
    return apiKeyDetails;
  }

  const payload = {
    ...apiKeyDetails,
  };

  if (payload.apiKey) {
    payload.apiKey = payload.apiKey?.slice?.(0, 6) + '****' + payload.apiKey?.slice?.(-6);
  }

  if (payload.deviceId) {
    payload.deviceId = payload.deviceId?.slice?.(0, 6) + '****' + payload.deviceId?.slice?.(-6);
  }

  return payload;
}

export function filterHeaders(headers: any) {
  const extractJwt = (authHeader) => (authHeader ? authHeader.slice(0, 6) + '****' + authHeader.slice(-6) : '');
  const extractTrimmedApiKey = (apiKey) => (apiKey ? apiKey.slice(0, 5) + '****' + apiKey.slice(-5) : '');
  const extractLocales = (localesHeader) => localesHeader ?? [];

  return {
    jwt: extractJwt(headers['authorization']),
    deviceId: String(headers['device'] ?? ''),
    userSessionId: String(headers['user_session_id'] ?? ''),
    timeZone: String(headers['timezone'] ?? ''),
    serviceAreaId: Number(headers['service_area_id'] ?? 0),
    firebaseDeviceId: String(headers['device_id_firebase'] ?? ''),
    apiKey: extractTrimmedApiKey(headers['api-key'] ?? headers['api_key'] ?? ''),
    locales: extractLocales(headers['locales']),
    host: String(headers['host'] ?? ''),
    origin: String(headers['origin'] ?? ''),
    'x-forwarded-for': String(headers['x-forwarded-for'] ?? ''),
    'user-agent': String(headers['user-agent'] ?? ''),
  };
}

function calculateAdjustedComplexity(executionTimeInMs: number, existingComplexity: number): number {
  const upperBound = 700;
  const lowerBound = 400; // Benchmark time in milliseconds
  const maxComplexity = 1000; // Maximum complexity achievable
  const minComplexity = 3; // Minimum complexity to avoid going too low
  const maxTime = 5000; // Time at which max complexity is reached for penalty

  let adjustmentFactor;

  if (executionTimeInMs >= lowerBound && executionTimeInMs <= upperBound) {
    // Within the neutral zone, return the existing complexity rounded
    return Math.round(existingComplexity);
  }

  if (executionTimeInMs <= lowerBound) {
    // Below benchmark - Apply reward
    // Closer to 0ms, the bigger the reward, but ensuring a smooth transition
    const distanceFromBenchmark = (lowerBound - executionTimeInMs) / lowerBound;
    // More aggressive reward for times < 100ms
    adjustmentFactor = executionTimeInMs < 100 ? Math.pow(distanceFromBenchmark, 2) : distanceFromBenchmark;
    // Calculate adjusted complexity, ensuring it does not fall below minComplexity
    return Math.round(Math.max(minComplexity, existingComplexity * (1 - adjustmentFactor)));
  }

  const timeOverBenchmark = executionTimeInMs - upperBound;
  const overTimeRatio = timeOverBenchmark / (maxTime - upperBound);

  // Implement a steep exponential growth for the penalty factor as we move away from 700ms
  let penaltyFactor = Math.pow(overTimeRatio * 8, 2); // Quadratic growth with an increased base multiplier
  penaltyFactor = Math.min(penaltyFactor, maxComplexity / existingComplexity); // Cap the penalty factor

  let adjustedComplexity = existingComplexity * (1 + penaltyFactor);
  // adjustedComplexity = Math.min(maxComplexity, adjustedComplexity);
  return Math.round(adjustedComplexity);
}

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin<any> {
  async requestDidStart(reqCtx: GraphQLRequestContext<any>): Promise<GraphQLRequestListener<any>> {
    const { operationName } = reqCtx.request;
    if (operationName == 'IntrospectionQuery') return; // ignore introspection

    // start timing
    reqCtx.contextValue.hrtimeQueryStart = process.hrtime();

    const headers = filterHeaders(Object.fromEntries(reqCtx.request?.http?.headers || new Map()) || {});

    // // set logger context
    // const logger = new Logger('GraphQL');

    return {
      async executionDidStart(reqCtx: GraphQLRequestContext<any>) {
        // query is parsed -> execution started
        headers['complexity'] = (<any>reqCtx).complexity;

        // using query hash as a unique reference to display
        const shortHash = `#${reqCtx.queryHash?.slice?.(-7) ?? 'failed'}`;
        const operationNameText = reqCtx?.operationName ? `${reqCtx.operationName} ` : '';
        const opertaionType = reqCtx?.operation?.operation;
        const message = `${opertaionType} (${operationNameText}${shortHash}) started`;

        Logger.verbose(message, {
          context: 'GraphQL',
          operationName: reqCtx.operationName,
          shortHash,
          queryHash: reqCtx.queryHash,
          contextId: reqCtx?.contextValue?.id,
          variables: reqCtx?.request?.variables,
          headers,
          query: reqCtx.request.query,
        });
      },
      async willSendResponse(resReqCtx: GraphQLRequestContextWillSendResponse<any>) {
        // query is finished

        // ignore introspection
        if (operationName == 'IntrospectionQuery') return;
        // everytime????
        // const logger = new Logger('GraphQL');

        // calculate execution time
        const hrtimeQueryEnd = process.hrtime(reqCtx.contextValue.hrtimeQueryStart);
        const executionTimeInMs = hrtimeParseToMiliSec(hrtimeQueryEnd);
        const executionTimeDisplayText = hrtimeParseToString(hrtimeQueryEnd);

        // using query hash as a unique reference to display
        const shortHash = `#${reqCtx?.queryHash?.slice?.(-7) ?? 'failed'}`;
        const operationNameText = reqCtx?.operationName ? `${reqCtx.operationName} ` : '';
        const opertaionType = reqCtx?.operation?.operation;

        const logContext = {
          context: 'GraphQL',
          operationName: reqCtx.operationName,
          shortHash,
          queryHash: reqCtx.queryHash,
          contextId: reqCtx?.contextValue?.id,
          variables: reqCtx?.request?.variables,
          headers,
          executionTimeInMs,
          executionTimeDisplayText,
          executionComplexity: calculateAdjustedComplexity(executionTimeInMs, headers['complexity']),
        };

        resReqCtx.response.http.headers.set('X-GraphQL-Complexity', String(headers['complexity']));
        resReqCtx.response.http.headers.set('X-GraphQL-Exec-Complexity', String(logContext.executionComplexity));

        if (resReqCtx.errors) {
          // operation failed
          const message = `${opertaionType} (${operationNameText}${shortHash}) failed`;
          Logger.error(message, resReqCtx.errors, {
            ...logContext,
            // errors: resReqCtx.response.errors,
          });
        } else {
          // operation was successfull
          const warn = logContext.executionComplexity > 500;
          const message = `${
            warn ? 'COMPLEXITY TOO HIGH ' : ''
          }${opertaionType} (${operationNameText}${shortHash}) success (${executionTimeDisplayText})`;
          if (warn) {
            Logger.warn(message, logContext);
            return;
          }

          Logger.verbose(message, logContext);
        }
      },
    };
  }
}
