import { BoxedAsyncGenerator } from '@luxcium/boxed-list';
import { getPhashCompute } from '@luxcium/phash-compute';
import { rConnect } from '@luxcium/redis-services';
import { scanDirsFrom } from '@luxcium/scan-dirs';
import { readFileSync } from 'node:fs';
import { boxImageFileWithStats } from './tools';

const configs = JSON.parse(
  readFileSync('/home/luxcium/projects/configs/mono-repo.jsonc').toString()
);

void (async function main() {
  //
  // -! Open the connection to the redis cache server
  const R = await rConnect(6383);
  //
  // -! Link the connection with the pHashCompute
  const phashCompute = getPhashCompute(R, false);

  const pathToFolder: string = configs['examples-phash-scout'].links.example;
  // -! Initialise the file scaner to scan each folders from the link provided
  const folders = scanDirsFrom(pathToFolder).addValidExt(['.jpg', '.png']);

  // -! Then set the valid files extensions to be used from the file scanner
  BoxedAsyncGenerator;
  boxImageFileWithStats;
  phashCompute;
  folders;

  // const result = BoxedAsyncGenerator.fromAsyncGen(folders)
  //   .mapAwait(imagePath => phashCompute(boxImageFileWithStats(imagePath)))
  //   .mapAwait(pHash => {
  //     console.log('loging:', pHash);
  //     void pHash;
  //   });

  // await result.asyncSpark();

  for await (const imagePath of folders) {
    const item = boxImageFileWithStats(imagePath);
    console.log('item :>> ', item);
    //   console.log('looping!', looping);
  }

  // -! Use the pHashCompute on each filesPaths with valid extensions
  // const computedResult: AsyncGenerator<
  //   WithExpectedStats & ImageFileWithPHashString,
  //   boolean,
  //   unknown
  // > = folders.map(imagePath => phashCompute(boxImageFileWithStats(imagePath)));

  // console.log(
  //   Object.getPrototypeOf(
  //     Object.getPrototypeOf(async function* () {}.prototype)
  //   )
  // );
  // console.log(Object.getPrototypeOf(async function* () {}.prototype));
  // console.log(async function* () {}.prototype);
  // result;

  //   void looping;
  // }
  // for await (const looping of result.unboxAsyncGen()) {
  //   console.log('looping!');
  //   void looping;

  process.exit(0);

  // -! Spark the scanner (starting it) login the computed or cached
  // for await (const looping of result.unboxAsyncGen()) {
  //   console.log('looping!');
  //   void looping;
  // }
})();

/*
next()
A function that accepts zero or one argument and returns a promise. The promise fulfills to an object conforming to the IteratorResult interface, and the properties have the same semantics as those of the sync iterator's.

type IteratorResult<T, TReturn = any> =
  | IteratorYieldResult<T>
  | IteratorReturnResult<TReturn>;

interface IteratorYieldResult<TYield> {
  done?: false;
  value: TYield;
}
interface IteratorReturnResult<TReturn> {
  done: true;
  val

return(value) Optional
A function that accepts zero or one argument and returns a promise. The promise fulfills to an object conforming to the IteratorResult interface, and the properties have the same semantics as those of the sync iterator's.

throw(exception) Optional
A function that accepts zero or one argument and returns a promise. The promise fulfills to an object conforming to the IteratorResult interface, and the properties have the same semantics as those of the sync iterator's.


 */
export interface Iterator<T, TReturn = any, TNext = undefined> {
  // Takes either 0 or 1 arguments - doesn't accept 'undefined'
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return?(value?: TReturn): IteratorResult<T, TReturn>;
  throw?(e?: any): IteratorResult<T, TReturn>;
}
