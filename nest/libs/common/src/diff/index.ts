/** based on https://gist.github.com/Yimiprod/7ee176597fef230d1451?permalink_comment_id=3267525#gistcomment-3267525 */

export function keyChanges(base, object) {
  const changes = {};

  function walkObject(base, object, path = '') {
    for (const key of Object.keys(base)) {
      const isArray = Array.isArray(base);

      const fixedKey = isArray ? `[${key}]` : key;
      const currentPath = path === '' ? fixedKey : `${path}.${fixedKey}`;

      if (object[key] === undefined) {
        changes[currentPath] = '-';
      }
    }

    for (const [key, value] of Object.entries(object)) {
      const isArray = Array.isArray(object);

      const currentPath = isArray ? path + `[${key}]` : path === '' ? key : `${path}.${key}`;

      if (base[key] === undefined) {
        changes[currentPath] = '+';
      } else if (value !== base[key]) {
        if (typeof value === 'object' && typeof base[key] === 'object') {
          walkObject(base[key], value, currentPath);
        } else {
          changes[currentPath] = object[key];
        }
      }
    }
  }

  walkObject(base, object);

  return changes;
}
