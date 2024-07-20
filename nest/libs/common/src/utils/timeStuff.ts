export function addMinutes(startDateISO: string, numMinutes: number): string {
  const startTimestamp = Date.parse(startDateISO);
  if (isNaN(startTimestamp)) {
    return null;
  }
  const resultDate = new Date(startTimestamp);
  resultDate.setTime(resultDate.getTime() + numMinutes * 60 * 1000);
  const returnTime = resultDate.toISOString();

  if (resultDate.getTime() < Date.now()) {
    return null;
  }

  return returnTime;
}

export function sanitizeToISO(dataUnsanitized: string) {
  try {
    if (!dataUnsanitized) {
      return dataUnsanitized;
    }

    return new Date(dataUnsanitized).toISOString();
  } catch (_) {
    return dataUnsanitized;
  }
}
