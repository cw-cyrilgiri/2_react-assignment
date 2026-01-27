export function getArrayParam(searchParams, key) {
  const value = searchParams.get(key);
  return value ? value.split(/[ +]/).map(Number) : [];
}

export function setArrayParam(searchParams, key, values) {
  if (!values.length) {
    searchParams.delete(key);
  } else {
    searchParams.set(key, values.join('+'));
  }
}

export function setParam(searchParams, key, value) {
  if (value === null || value === undefined || value === '') {
    searchParams.delete(key);
  } else {
    searchParams.set(key, value);
  }
}
