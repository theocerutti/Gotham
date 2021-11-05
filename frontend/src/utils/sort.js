export const sortObject = (obj, sortFunc) => {
  const sortable = [];
  for (const oKey in obj) {
    sortable.push([oKey, obj[oKey]]);
  }
  sortable.sort((a, b) => sortFunc(a, b));
  const sortedObject = {};
  sortable.forEach((o) => {
    sortedObject[o[0]] = o[1];
  });
  return sortedObject;
};