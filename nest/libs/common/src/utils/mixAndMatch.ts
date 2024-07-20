/**
 * Sorts array of arrays by length, then takes first element from each
 * and recursively repeats the same operation on the array of remaining arrays.
 * @param allGroups - Array of arrays (e.g. products by brand).
 * @param allSorted - Array of mixed items.
 * @returns
 */
export function mixAndMatch<T>(allGroups: T[][], allSorted: T[] = []): T[] {
  let numGroups = allGroups.length;
  const remainingGroups = [];
  return sortByLength(allGroups).reduce((sorted, arr) => {
    sorted.push(arr.shift());
    if (arr.length > 0) {
      remainingGroups.push(arr);
    }
    numGroups--;
    if (numGroups === 0 && remainingGroups.length > 0) {
      return mixAndMatch(remainingGroups, sorted);
    }
    return sorted;
  }, allSorted);
}

function sortByLength<T>(arrList: T[][]) {
  return [...arrList].sort((a, b) => b.length - a.length);
}
