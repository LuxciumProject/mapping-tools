import { faker } from '@faker-js/faker';

export const mount = (/** @type {Element} */ element) => {
  let products = '';
  for (let i = 0; i < 10; i++) {
    const name = faker.commerce.productName();
    products += `<div>${name}</div>`;
  }

  element ? (element.innerHTML = products) : void null;
  return element;
};

/**
 * Will be used in development only in isolation mode to render
 * into the #isolation-dev-products element
 */
function automount(/** @type {'#isolation-dev-products'} */ selector) {
  const devProductsElement = document.querySelector(selector);
  console.log('From Products Page (before mount)!!!');
  if (devProductsElement) {
    mount(devProductsElement);
    return console.log('From Products Page (after mount)!!!');
  }
  return console.error(`Did not find element ${selector}`);
}

if (process.env['NODE_ENV'] === 'development') {
  automount('#isolation-dev-products');
}

export default mount;
