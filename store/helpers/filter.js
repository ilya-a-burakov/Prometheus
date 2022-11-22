let products = [{
  name: 'product-1',
  modifications: [{
    name: 'modification-1',
    characteristics: [
      {name: 'Размер', value: 'S'},
      {name: 'Цвет',   value: 'Зеленый'}
    ]
  }, {
    name: 'modification-2',
    characteristics: [
      {name: 'Размер',value: 'L'},
      {name: 'Цвет',value: 'Зеленый'}
    ]
  }]
},{
  name: 'product-2',
  modifications: [{
    name: 'modification-3',
    characteristics: [
      {name: 'Размер', value: 'M'},
      {name: 'Цвет',   value: 'Зеленый'}
    ]
  }, {
    name: 'modification-4',
    characteristics: [
      {name: 'Размер',value: 'L'},
      {name: 'Цвет',value: 'Красный'}
    ]
  }]
},]


let filtered = products.filter(function(product, index) {
  return product.modifications.some(function(modification, index) { 
    return modification.characteristics.some(function(char, index) { 
      return char.value === 'M'
    })
  })
});

console.log(filtered);
