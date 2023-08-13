function filterAndReturnFilteredOut(array, filterFunction) {
  const filtered = array.filter(filterFunction);
  const filteredOut = array.filter((item) => !filterFunction(item));
  return { filtered, filteredOut };
}

export { filterAndReturnFilteredOut };
