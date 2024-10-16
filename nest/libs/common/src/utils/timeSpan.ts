function convertHrtime(hrtime) {
  const nanoseconds = hrtime;
  const number = Number(nanoseconds);
  const milliseconds = number / 1000000;
  const seconds = number / 1000000000;

  return {
    seconds,
    milliseconds,
    nanoseconds,
  };
}

export function timeSpan() {
  const start = process.hrtime.bigint();
  const end = (type) => convertHrtime(process.hrtime.bigint() - start)[type];

  const returnValue = () => end('milliseconds');
  returnValue.rounded = () => Math.round(end('milliseconds'));
  returnValue.seconds = () => end('seconds');
  returnValue.nanoseconds = () => end('nanoseconds');

  return returnValue;
}
