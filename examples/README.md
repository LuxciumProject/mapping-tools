# Mapping Tools Examples

This directory contains examples demonstrating the usage of mapping-tools.

## Running the Examples

### Prerequisites

Make sure you have built the library first:

```bash
yarn build
```

### Chainable API Examples

The `chainable-api.ts` file demonstrates the fluent, chainable API:

```bash
# Run with ts-node
node -r ts-node/register examples/chainable-api.ts

# Or compile and run
tsc examples/chainable-api.ts --outDir examples/dist
node examples/dist/chainable-api.js
```

## Examples Included

### 1. Basic Chaining
Shows how to chain multiple transformations together using the fluent API.

### 2. Error Handling
Demonstrates different ways to handle errors:
- `getValues()` - filters out errors
- `getAllValues()` - preserves positions with NULL_SYMBOL
- `toArray()` - gets complete settled results

### 3. Complex Async Operations
Shows real-world usage with async API calls and data enrichment.

### 4. Mixing Different Mapping Types
Demonstrates combining `awaitedMapping()`, `serialMapping()`, and `parallelMapping()`.

### 5. Validation and Lookup Functions
Shows how to use the delegate functions for validation and side effects.

### 6. Promise Input
Demonstrates working with promises as input to the chain.

### 7. Backwards Compatibility
Shows that older methods like `filterRight()` and `extractFulfilledValues()` still work.

## Key Concepts

### Creating a Chain

```typescript
import { chain, Chain } from 'mapping-tools';

// Using chain() helper (recommended)
const result1 = await chain([1, 2, 3]).getValues();

// Using Chain.of() static method
const result2 = await Chain.of([1, 2, 3]).getValues();
```

### Value Extraction Methods

- **`getValues()`** - Returns only successful values (recommended for most use cases)
- **`toArray()`** - Returns complete Settled<T>[] array with status info
- **`getAllValues()`** - Returns all values with NULL_SYMBOL for failures, preserving positions

### Transformation Methods

- **`awaitedMapping()`** - Parallel transformations using Promise.all
- **`serialMapping()`** - Sequential transformations using for...of loop
- **`parallelMapping()`** - Returns array of promises
- **`generateMapping()`** - Returns a generator
- **`generateMappingAsync()`** - Returns an async generator

## More Information

See the main [README.md](../README.md) for complete API documentation.
