// import { BoxedGenerator } from '@luxcium/boxed-list';
// import { BoxedAsyncGenerator } from '@luxcium/boxed-list';
import { boxImageFileWithStats, getPhashCompute } from '@luxcium/phash-compute';
import { rConnect } from '@luxcium/redis-services';
import { scanDirsFrom } from '@luxcium/scan-dirs';
import { readFileSync, Stats } from 'node:fs';

const configs = JSON.parse(readFileSync('/home/luxcium/projects/configs/mono-repo.jsonc').toString());

void (async function main() {
  //
  // -! Open the connection to the redis cache server

  const R = await rConnect(6383);

  // -! Link the connection with the pHashCompute

  const phashCompute = getPhashCompute(R, false);

  // -! Initialise the file scaner to scan each folders from the link provided

  const folders = scanDirsFrom(configs['examples-phash-scout'].links.example);

  // -! Then set the valid files extensions to be used from the file scanner

  folders.addValidExt(['.jpg', '.png']);

  // -! Use the pHashCompute on each filesPaths with valid extensions

  const computedResult = folders.map(imagePath => phashCompute(boxImageFileWithStats(imagePath)));

  // -! Spark the scanner (starting it) login the computed or cached

  for await (const pHash of computedResult) {
    console.log('loging:', pHash);
    void pHash;
  }
})();

// const scaner = BoxedGenerator.fromGen<any>(folders.scan);
// const computedResult = scaner.map(phashCompute);
// pHash to the console
// const asyncComputedResult = BoxedAsyncGenerator.fromAsyncGen(folders.map(idem => idem));
// const computedResult = asyncComputedResult.mapAwait(phashCompute);

export type WithStats1 = {
  awaited: {
    stat: Promise<Stats>;
  };
};

export type WithAwaited<T extends Object> = {
  awaited: T;
};

export type WithStats = WithAwaited<{
  stat: Promise<Stats>;
}>;

// function someAwaited() {}
/*
type WithStats2 = {
    awaited: {
        stat: Promise<Stats>;
    };
}
type WithStats1 = {
    awaited: {
        stat: Promise<Stats>;
    };
}

 */
