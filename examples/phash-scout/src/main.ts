import getPhashCompute from '@luxcium/phash-compute';
import { rConnect } from '@luxcium/redis-services';
import { from } from '@luxcium/scan-dirs';
import { readFileSync } from 'fs';

const configs = JSON.parse(readFileSync('/home/luxcium/projects/configs/mono-repo.jsonc').toString());

void (async function main() {
  //
  // Open the connection to the redis cache server
  const R = await rConnect(6383);

  // Link the connection with the pHashCompute
  const phashCompute = getPhashCompute(R);

  // Initialise the file scaner to scan each folders from the link provided
  const scaner = from(configs['examples-phash-scout'].links.example);

  // Then set the valid files extensions to be used from the file scanner
  scaner.addValidExt(['.jpg', '.png']);

  // Use the pHashCompute on each filesPaths with valid extensions
  const computedResult = scaner.map(phashCompute);

  // Spark the scanner (starting it) login the computed or cached
  // pHash to the console
  for await (const pHash of computedResult) {
    console.log('scaner:', pHash);
  }
})();
