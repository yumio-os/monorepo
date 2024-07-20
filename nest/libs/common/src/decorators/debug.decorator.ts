import { pick, zipObject } from 'lodash';

import { Logger } from '@nestjs/common';

import { timeSpan } from '../utils/timeSpan';

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
const ARGUMENT_NAMES = /([^\s,]+)/g;

function getParamNames(func) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  const result =
    fnStr?.slice?.(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES) || [];
  return result || [];
}

function getFnParams(fnOrigin, fnArgs, resolveParams) {
  const fnParams = zipObject(getParamNames(fnOrigin), fnArgs);
  if (resolveParams == null) {
    return fnParams;
  }
  if (typeof resolveParams === 'function') {
    return resolveParams(fnParams);
  }
  if (Array.isArray(resolveParams)) {
    return pick(fnParams, resolveParams);
  }
}

// TODO: fix this, it currently makes any function async
export function DebugExecutionTime(ctxName: string, resolveParams?: any) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const origin = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const getExecutionTime = timeSpan();
      const fnName = origin.name;
      const params = getFnParams(origin, args, resolveParams);
      Logger.debug(`${ctxName}.${fnName} start`, { context: 'DebugDecorator', params });
      const result = await Promise.resolve(origin.apply(this, args));
      Logger.debug(`${ctxName}.${fnName} finish`, {
        context: 'DebugDecorator',
        params,
        timeElapsed: getExecutionTime(),
      });
      return result;
    };
  };
}
