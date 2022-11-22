import { wget } from './wget';

import chalk from 'chalk';
import { deserializeURI } from './codecs';
import { timeoutZalgo } from './timeout-zalgo';

export const commands: { [k: string]: any } = {
  ['hello-world'](...args: any[]) {
    console.log(
      chalk.ansi256(209)('Hello wold will echo back:'),
      chalk.ansi256(92)(deserializeURI(...(args as [any]))) + '\n\n'
    );
    return {
      ['hello-world']: chalk.yellow('Hello wold just echo back!'),
      args: deserializeURI(...(args as [any])),
    };
  },
  async delay(...args: any[]) {
    const result = timeoutZalgo(args, Number(args[0]) || 2000);
    console.log('\ncomputing:', { result });
    await result;
    console.log('done:', { result }, '\n');
    return result;
  },
  async wget(...args: any[]) {
    const arg0 = (args[0] as string).split(',');
    const source = deserializeURI(arg0[0]);
    const localDestination = deserializeURI(arg0[1]);
    return wget(source, localDestination);
  },
};
