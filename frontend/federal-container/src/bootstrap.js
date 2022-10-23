import mountCart from 'cart/CartShow';
import mountProducts from 'products/ProductsIndex';

if (process.env['NODE_ENV'] === 'development') {
  console.log('From Container !!!');
  mountProducts(document.querySelector('#dev-products'));
  mountCart(document.querySelector('#dev-cart'));
}

// HACK: may need to rename #IDs
mountProducts(document.querySelector('#dev-products'));
mountCart(document.querySelector('#dev-cart'));
