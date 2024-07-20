export function hrtimeParseToString(hrtime: number[]): string {
  let parsedString = '';
  if (hrtime[0] > 0) {
    // more than 1 sec -> use sec
    parsedString = `${(hrtime[0] + hrtime[1] / 1000000 / 1000).toFixed(2)}s`;
  } else {
    // less than 1 sec -> use ms
    parsedString = `${(hrtime[0] * 1000 + hrtime[1] / 1000000).toFixed()}ms`;
  }
  return parsedString;
}

export function hrtimeParseToMiliSec(hrtime: number[]) {
  return hrtime[0] * 1000 + hrtime[1] / 1000000;
}

export function safeIntParser(x: any, defaultValue: number = 0): number {
  try {
    return parseInt(x, 10) || defaultValue;
  } catch (_) {
    return defaultValue;
  }
}
