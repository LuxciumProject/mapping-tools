import * as fs from 'fs';
import * as path from 'path';

import type { Settled, SettledLeft, SettledRight } from '../types/Settled';

/**
 * Gets a list of folders from the specified directory path.
 * @param directory - The path to the directory.
 * @returns An array of folder names.
 */
const getFolders = (directory: string): string[] => {
  const items = fs.readdirSync(directory);
  const folders = items.filter(item => fs.lstatSync(path.join(directory, item)).isDirectory());
  return folders;
};

// Example usage to ensure the function is consumed
const exampleDirectory = './example-directory';
const folders = getFolders(exampleDirectory);
console.log(folders);

/**
 * Gets a list of files from the specified folder.
 * @param folder - The path to the folder.
 * @returns An array of file names.
 */
const getFiles = (folder: string): string[] => {
  const items = fs.readdirSync(folder);
  const files = items.filter(item => fs.lstatSync(path.join(folder, item)).isFile());
  return files;
};

// Example usage to ensure the function is consumed
const exampleFolder = './example-directory/some-folder';
const files = getFiles(exampleFolder);
console.log(files);


/**
 * A higher-order function that processes an initial operation to produce a list,
 * then processes each item in that list with a secondary operation, wrapping each result.
 * @param initialOperation - The function to produce the initial list.
 * @param secondaryOperation - The function to process each item in the initial list.
 * @returns A function that processes a path and returns a wrapped list of wrapped results.
 */
function createMetaWrapper<T, U>(
  initialOperation: (path: string) => T[],
  secondaryOperation: (item: T) => U[]
): (path: string) => Settled<U>[] {
  return function(path: string): Settled<U>[] {
    const initialList = initialOperation(path);
    const results: Settled<U>[] = [];

    initialList.forEach((item, index) => {
      try {
        const secondaryList = secondaryOperation(item);
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
