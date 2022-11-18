import { exec } from 'child_process';
import { promisify } from 'node:util';
export async function wget(
  imageSource: string,
  destination: string,
  shell: string = '/bin/bash'
) {
  const sourceUrl = encodeURI(imageSource);
  const destinationPath = `/downloads/${decodeURIComponent(destination)}`;
  const execCommand = `/usr/bin/wget --debug -nc "${sourceUrl}" -P "${destinationPath}"`;
  return promisify(exec)(execCommand, { shell });
}
