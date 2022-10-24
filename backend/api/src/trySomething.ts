import getPhashCompute from '@luxcium/phash-compute';
import { rConnect } from '@luxcium/redis-services';
import { from } from '@luxcium/scan-dirs';
rConnect;
getPhashCompute;

void (async function main() {
  const R = await rConnect(6383);
  const phashCompute = getPhashCompute(R);
  const scaner = from('/home/luxcium/projects/monorepo-one/public/imgs/')
    .addValidExt(['.jpg', '.png'])
    .map(phashCompute);

  for await (const some of scaner) {
    console.log(some);
  }
  // console.log(
  //   await phashCompute(
  //     '/home/luxcium/projects/monorepo-one/public/imgs/unsplash-Toby Wong.jpg',
  //   ),
  // );
  // return phashCompute;
})();
