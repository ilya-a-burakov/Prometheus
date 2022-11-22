export function addNestedObject(obj, path) {
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, '');           // strip a leading dot

  const pList = path.split('.');

  const key = pList.pop();
  const pointer = pList.reduce((accumulator, currentValue) => {
    if (accumulator[currentValue] === undefined) accumulator[currentValue] = {};
    return accumulator[currentValue];
  }, obj);

  // console.log(path);
  // console.log(pList);
  // console.log(pointer);
  // console.log(key);
  console.log(pointer[key])
  pointer[key] = pointer[key] || [];


  pointer[key].push({})
  return obj;
}