export {};

const rl = null as any
/**
 * Main is the internal code entry point it should be executed by
 * itself and MUST NOT BE IMPORTED FROM index.ts file
 */
void (async function MAIN() {
const answer = await rl.question('What is your favorite food? ');
console.log(`Oh, so your favorite food is ${answer}`);
return void 0
})()
