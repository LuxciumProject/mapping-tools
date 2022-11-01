// import { BoxedGenerator } from '@luxcium/boxed-list';
import { getPhashCompute } from '@luxcium/phash-compute';
import { rConnect } from '@luxcium/redis-services';
import { scanDirsFrom } from '@luxcium/scan-dirs';
import { readFileSync } from 'fs';

const configs = JSON.parse(readFileSync('/home/luxcium/projects/configs/mono-repo.jsonc').toString());

void (async function main() {
  //
  // Open the connection to the redis cache server
  const R = await rConnect(6383);

  // Link the connection with the pHashCompute
  const phashCompute = getPhashCompute(R, 'DEBUG');

  // Initialise the file scaner to scan each folders from the link provided
  const folders = scanDirsFrom(configs['examples-phash-scout'].links.example);

  // Then set the valid files extensions to be used from the file scanner
  folders.addValidExt(['.jpg', '.png']);
  // const scaner = BoxedGenerator.fromGen<any>(folders.scan);

  // Use the pHashCompute on each filesPaths with valid extensions
  const computedResult = folders.map(phashCompute);
  // const computedResult = scaner.map(phashCompute);

  // Spark the scanner (starting it) login the computed or cached
  // pHash to the console

  for await (const pHash of computedResult) {
    // console.log('scaned! \n');
    void pHash;
  }
})();
