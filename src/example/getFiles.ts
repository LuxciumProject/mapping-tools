import {lstatSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
/**
 * Gets a list of files from the specified folder.
 * @param folder - The path to the folder.
 * @returns An array of file names.
 */
export const getFiles = (folder: string): string[] => {
  const items =  readdirSync(folder);
  const files = items.filter(item =>  lstatSync( join(folder, item)).isFile());
  return files;
};
