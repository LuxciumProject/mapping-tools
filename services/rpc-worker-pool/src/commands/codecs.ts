export function sanitizeURI(str: string): string {
  // encodeURI preserves:
  // A-Za-z0-9;,/?:@&=+$-_.!~*'()#
  // and fixedEncodeURI preserves: []
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}
export function decodeSanitizedURI(encodedURI: string): string {
  return decodeURI(encodedURI);
}
export function serializeURI(str: string): string {
  return encodeURIComponent(str);
}
export function deserializeURI(encodedURI: string): string {
  return decodeURIComponent(encodedURI);
}

// export function sanitizeURI(str: string) {
//   return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
// }

void function example() {
  // Reserved Characters : ";,/?:@&=+$"
  // encodeURI: ;,/?:@&=+$
  // encodeURIComponent: %3B%2C%2F%3F%3A%40%26%3D%2B%24

  // Unescaped Characters : "-_.!~*'()"
  // encodeURI: -_.!~*'()
  // encodeURIComponent: -_.!~*'()

  // Number Sign : "#"
  // encodeURI: #
  // encodeURIComponent: %23

  // Alphanumeric Characters + Space : "ABC abc 123"
  // encodeURI: ABC%20abc%20123 (the space gets encoded as %20)
  // encodeURIComponent: ABC%20abc%20123 (the space gets encoded as %20)

  const set1 = ';,/?:@&=+$'; // Reserved Characters
  const set2 = "-_.!~*'()"; // Unescaped Characters
  const set3 = '#'; // Number Sign
  const set4 = 'ABC abc 123'; // Alphanumeric Characters + Space

  console.log('\n\nencodeURI:'); // ;,/?:@&=+$

  console.log('\nset1(Reserved Characters):', set1);
  console.log(encodeURI(set1)); // ;,/?:@&=+$
  console.log('\nset2(Unescaped Characters):', set2);
  console.log(encodeURI(set2)); // -_.!~*'()
  console.log('\nset3(Number Sign):', set3);
  console.log(encodeURI(set3)); // #
  console.log('\nset4(Alphanumeric Characters + Space):', set4);
  console.log(encodeURI(set4)); // ABC%20abc%20123 (the space gets encoded as %20)

  console.log('\n\nencodeURIComponent:'); // %3B%2C%2F%3F%3A%40%26%3D%2B%24
  console.log('\nset1(Reserved Characters):', set1);
  console.log(encodeURIComponent(set1)); // %3B%2C%2F%3F%3A%40%26%3D%2B%24
  console.log('\nset2(Unescaped Characters):', set2);
  console.log(encodeURIComponent(set2)); // -_.!~*'()
  console.log('\nset3(Number Sign):', set3);
  console.log(encodeURIComponent(set3)); // %23
  console.log('\nset4(Alphanumeric Characters + Space):', set4);
  console.log(encodeURIComponent(set4)); // ABC%20abc%20123 (the space gets encoded as %20)
};
