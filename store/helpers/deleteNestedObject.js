export function deleteNestedObject(obj, path) {
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, '');           // strip a leading dot

  const pList = path.split('.');
 
  const pListArray = path.split('.');
  const pListArrayKey = pListArray.pop();
  pListArray.pop()

  const key = pList.pop();
  const pointer = pList.reduce((accumulator, currentValue) => {
    if (accumulator[currentValue] === undefined) accumulator[currentValue] = {};
    return accumulator[currentValue];
  }, obj);

  function recompose(obj, string) {
    var parts = string.split('.');
    var newObj = obj[parts[0]];
    if (parts[1]) {
      parts.splice(0, 1);
      var newString = parts.join('.');
      return recompose(newObj, newString);
    }
    return newObj;
  }

  console.log(recompose(obj, pListArray.join('.')));


  // console.log(obj)
  // console.log(pointer)
  // console.log(key)

  pointer.splice(key, 1)
  return obj;
}