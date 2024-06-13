// import { parallelMapping } from 'mapping-tools'; // Adjust the path based on the actual location
import * as path from 'path';

import type { Settled, SettledLeft, SettledRight } from '../types/Settled';
import { getFiles } from './getFiles';
import { getFolders } from './getFolders';




// Example usage to ensure the function is consumed
const exampleDirectory = path.resolve(__dirname, './example-directory');
const folders = getFolders(exampleDirectory);
console.log(folders);



// Example usage to ensure the function is consumed
const exampleFolder = path.resolve(__dirname, './example-directory/folder-1');
const files = getFiles(exampleFolder);
console.log(files);

/**
 * A higher-order function that processes an initial operation to produce a list,
 * then processes each item in that list with a secondary operation, wrapping each result.
 * @param initialOperation - The function to produce the initial list.
 * @param secondaryOperation - The function to process each item in the initial list.
 * @returns A function that processes a path and returns a wrapped list of wrapped results.
 */
function createMetaWrapper<T extends string, U>(
  initialOperation: (path: string) => T[],
  secondaryOperation: (item: string) => U[]
): (path: string) => Settled<U>[] {
  return function(directory: string): Settled<U>[] {
    const initialList = initialOperation(directory);
    const results: Settled<U>[] = [];

    initialList.forEach((folder, index) => {
      const folderPath = path.join(directory, folder);
      try {
        const secondaryList = secondaryOperation(folderPath);
        secondaryList.forEach((result, secondaryIndex) => {
          results.push({
            status: 'fulfilled',
            value: result,
            transformStep: secondaryIndex,
            index: index,
            currentRejection: null,
            fulfilled: result,
            rejected: null
          } as SettledRight<U>);
        });
      } catch (error) {
        results.push({
          status: 'rejected',
          reason: error,
          transformStep: 0,
          index: index,
          currentRejection: true,
          fulfilled: null,
          rejected: error
        } as SettledLeft);
      }
    });

    return results;
  };
}

// Example usage to ensure the function is consumed
const processPath = createMetaWrapper(getFolders, getFiles);
const wrappedResults = processPath(exampleDirectory);
console.log(wrappedResults);
