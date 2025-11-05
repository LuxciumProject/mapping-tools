import {lstatSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
/**
 * Gets a list of folders from the specified directory path.
 * @param directory - The path to the directory.
 * @returns An array of folder names.
 */
export const getFolders = (directory: string): string[] => {
  const items =  readdirSync(directory);
  const folders = items.filter(item =>  lstatSync(join(directory, item)).isDirectory());
  return folders;
};
