import faker from 'faker';

let products = '';

for (let i = 0; i < 10; i++) {
  const name = faker.commerce.productName();
  products += `<div>${name}</div>`;
}
const devProducts = document.querySelector('#dev-products');

devProducts ? (devProducts.innerHTML = products) : void null;

console.log('From Products Page !!!');
