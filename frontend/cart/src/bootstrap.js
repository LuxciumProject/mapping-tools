import { faker } from '@faker-js/faker';

const carText = `<div>${faker.random.numeric(4)} items in your cart!</div>`;
// let products = '';

// for (let i = 0; i < 10; i++) {
//   const name = faker.commerce.productName();
//   products += `<div>${name}</div>`;
// }
const devCart = document.querySelector('#dev-cart');

devCart ? (devCart.innerHTML = carText) : void null;

console.log('From Cart Page !!!');
