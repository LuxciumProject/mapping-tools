import { faker } from '@faker-js/faker';

export const mount = (/** @type {Element} */ element) => {
  const carText = `<div>${faker.random.numeric(4)} items in your cart!</div>`;

  element ? (element.innerHTML = carText) : void null;
  return element;
};

/**
 * Will be used in development only in isolation mode to render
 * into the #isolation-dev-cart element
 */
function automount(/** @type {'#isolation-dev-cart'} */ selector) {
  const devProductsElement = document.querySelector(selector);
  console.log('From Products Page (before mount)!!!');
  if (devProductsElement) {
    mount(devProductsElement);
    return console.log('From Products Page (after mount)!!!');
  }
  return console.error(`Did not find element ${selector}`);
}

if (process.env['NODE_ENV'] === 'development') {
  console.log('From Cart Page !!!');
  automount('#isolation-dev-cart');
}

export default mount;
