import { exec } from 'child_process';
import { promisify } from 'node:util';
export async function wget(
  imageSource: string,
  destination: string,
  shell: string = '/bin/bash'
) {
  const sourceUrl = encodeURI(imageSource);
  const destinationPath = `/downloads/${decodeURIComponent(destination)}`;
  const execCommand = `/usr/bin/wget "${sourceUrl}" -P "${destinationPath}"`;
  return promisify(exec)(execCommand, { shell });
}

/*
  errorFn: (error: ExecException) => void = console.error,
  stdoutFn: (stdout: string) => void = console.log,
  stderrFn: (stderr: string) => void = console.log,

    const callback = (
    error: ExecException | null,
    stdout: string,
    stderr: string
  ): void => (error ? errorFn(error) : stdoutFn(stdout), stderrFn(stderr));
  void callback;


  // const execResult = exec(execCommand, { shell }, callback);
  // console.log('COMMAND THAT WILL BE SENT TO WGET:', execCommand);

  // console.log('COMMAND THAT WAS SENT TO WGET:', execCommand);

  // return execResult;
 */
