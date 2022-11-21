import { wget } from './wget';

import { deserializeURI } from './codecs';

export const commands: { [k: string]: any } = {
  ['hello-world'](...args: any[]) {
    console.log(
      'Hello wold will echo back:',
      deserializeURI(...(args as [any]))
    );
    return {
      ['hello-world']: 'Hello wold just echo back!',
      args: deserializeURI(...(args as [any])),
    };
  },
  async wget(...args: any[]) {
    const arg0 = (args[0] as string).split(',');
    const source = deserializeURI(arg0[0]);
    const localDestination = deserializeURI(arg0[1]);
    return wget(source, localDestination);
  },
};
