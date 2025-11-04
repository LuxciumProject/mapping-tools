/**
 * Example demonstrating the fluent, chainable API of mapping-tools
 * This example shows various use cases and patterns for the Chain API
 */

import { chain } from '../src';

// Example 1: Basic chaining
async function basicChaining() {
  console.log('=== Basic Chaining ===');
  
  const result = await chain([1, 2, 3, 4, 5])
    .awaitedMapping(async x => x * 2)
    .awaitedMapping(async x => x + 1)
    .getValues();
  
  console.log('Input: [1, 2, 3, 4, 5]');
  console.log('After x * 2 then x + 1:', result);
  console.log('Expected: [3, 5, 7, 9, 11]\n');
}

// Example 2: Error handling
async function errorHandling() {
  console.log('=== Error Handling ===');
  
  const data = [1, 2, 3, 4, 5];
  
  // Using getValues() to get only successful transformations
  const successOnly = await chain(data)
    .awaitedMapping(async x => {
      if (x % 2 === 0) throw new Error(`Skipping even number: ${x}`);
      return x * 2;
    })
    .getValues();
  
  console.log('Input:', data);
  console.log('Success only (odd numbers * 2):', successOnly);
  
  // Using getAllValues() to preserve array positions
  const withNulls = await chain(data)
    .awaitedMapping(async x => {
      if (x % 2 === 0) throw new Error(`Skipping even number: ${x}`);
      return x * 2;
    })
    .getAllValues();
  
  console.log('With NULL_SYMBOL for failures:', withNulls.map(v => 
    typeof v === 'symbol' ? 'NULL' : v
  ));
  
  // Using toArray() to get complete settled results
  const settled = await chain(data)
    .awaitedMapping(async x => {
      if (x === 3) throw new Error('Skip 3');
      return x * 2;
    })
    .toArray();
  
  console.log('\nSettled results:');
  settled.forEach((s, i) => {
    console.log(`  [${i}] ${s.status}: ${s.status === 'fulfilled' ? s.value : s.reason.message}`);
  });
  console.log();
}

// Example 3: Complex async operations
async function complexOperations() {
  console.log('=== Complex Async Operations ===');
  
  interface User {
    id: number;
    name: string;
  }
  
  interface UserData {
    userId: number;
    posts: number;
  }
  
  // Simulate API calls
  const fetchUser = async (id: number): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return { id, name: `User${id}` };
  };
  
  const fetchUserData = async (userId: number): Promise<UserData> => {
    await new Promise(resolve => setTimeout(resolve, 50));
    if (userId === 3) throw new Error('User 3 data not found');
    return { userId, posts: userId * 10 };
  };
  
  const userIds = [1, 2, 3, 4, 5];
  
  const enrichedUsers = await chain(userIds)
    .awaitedMapping(async id => fetchUser(id))
    .awaitedMapping(async user => {
      const data = await fetchUserData(user.id);
      return { ...user, posts: data.posts };
    })
    .getValues();
  
  console.log('User IDs:', userIds);
  console.log('Enriched users (successful):', enrichedUsers);
  console.log('Note: User 3 was skipped due to error\n');
}

// Example 4: Mixing different mapping types
async function mixedMappingTypes() {
  console.log('=== Mixing Different Mapping Types ===');
  
  const data = [1, 2, 3, 4, 5];
  
  const result = await chain(data)
    .awaitedMapping(async x => {
      console.log(`  Parallel transform: ${x} -> ${x * 2}`);
      return x * 2;
    })
    .serialMapping(async x => {
      console.log(`  Serial transform: ${x} -> ${x + 10}`);
      await new Promise(resolve => setTimeout(resolve, 100));
      return x + 10;
    })
    .awaitedMapping(async x => {
      console.log(`  Parallel transform: ${x} -> ${x / 2}`);
      return x / 2;
    })
    .getValues();
  
  console.log('Final result:', result);
  console.log();
}

// Example 5: Using validation and lookup functions
async function validationAndLookup() {
  console.log('=== Validation and Lookup ===');
  
  const data = [1, 2, 3, 4, 5];
  
  const result = await chain(data)
    .awaitedMapping(
      // Transform function
      async x => x * 2,
      
      // Lookup function (side effect after transform)
      value => console.log(`  Transformed value: ${value}`),
      
      // Validation function
      async value => {
        if (value > 6) {
          throw new Error(`Value ${value} exceeds limit`);
        }
      },
      
      // Error lookup function
      (reason, index, currentRejection) => {
        if (currentRejection) {
          console.log(`  Error at index ${index}: ${reason.message}`);
        }
      }
    )
    .getValues();
  
  console.log('Valid results (≤ 6):', result);
  console.log();
}

// Example 6: Working with promises as input
async function promiseInput() {
  console.log('=== Promise Input ===');
  
  const promisedData = Promise.resolve([10, 20, 30, 40]);
  
  const result = await chain(promisedData)
    .awaitedMapping(async x => x / 10)
    .awaitedMapping(async x => x + 100)
    .getValues();
  
  console.log('Input: Promise.resolve([10, 20, 30, 40])');
  console.log('After /10 and +100:', result);
  console.log();
}

// Example 7: Backwards compatibility
async function backwardsCompatibility() {
  console.log('=== Backwards Compatibility ===');
  
  const data = [1, 2, 3, 4, 5];
  
  // Old methods still work
  const filtered = await chain(data)
    .awaitedMapping(async x => {
      if (x === 3) throw new Error('Skip');
      return x * 2;
    })
    .filterRight();
  
  console.log('Using filterRight():', filtered.map(s => s.value));
  
  const extracted = await chain(data)
    .awaitedMapping(async x => x * 2)
    .extractFulfilledValues();
  
  console.log('Using extractFulfilledValues():', extracted);
  console.log();
}

// Run all examples
async function main() {
  console.log('='.repeat(60));
  console.log('MAPPING-TOOLS: Chainable API Examples');
  console.log('='.repeat(60));
  console.log();
  
  await basicChaining();
  await errorHandling();
  await complexOperations();
  await mixedMappingTypes();
  await validationAndLookup();
  await promiseInput();
  await backwardsCompatibility();
  
  console.log('='.repeat(60));
  console.log('All examples completed successfully!');
  console.log('='.repeat(60));
}

// Execute if running directly
if (require.main === module) {
  main().catch(console.error);
}

export {
  basicChaining,
  errorHandling,
  complexOperations,
  mixedMappingTypes,
  validationAndLookup,
  promiseInput,
  backwardsCompatibility,
};
