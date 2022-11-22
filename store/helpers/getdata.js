getUsersData({ users: { data: { users } } }) {
  if (!users) return [];

  return Object.values(users.stats || {})
    .map((statValues) => {
      Object
        .getOwnPropertyNames(statValues)
        .filter(key => !key.includes('active'))
        .reduce((result, key) => {
          result[key] = statValues[key];
          return result;
        }, {});
    });

products.filter(product =>
  product.items.some(item => item.name === 'milk');
).map(product =>
  product.id
) // [03]

products.find(product => product.items.some(item => item.name === 'milk'));