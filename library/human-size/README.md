# node-human-size

Tiny module to get a human readable file size from a byte count.

## Usage

```ts
import humanSize from 'human-size';

console.log(humanSize(10 * 1024 * 1024));
// prints "10MB"

console.log(humanSize(10 * 1024 * 1024, 2));
// prints "10.00MB"

console.log(humanSize(106168));
// prints "104KB"

console.log(humanSize(106168, 2));
// prints "103.68KB"
```

Based on the work of Andrew Kelley (MIT © 2014-2022)

###### MIT © 2022 Luxcium (Benjamin Vincent)
