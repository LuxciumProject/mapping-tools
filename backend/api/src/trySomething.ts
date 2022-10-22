import getPhashCompute from '@luxcium/phash-compute';
import { rConnect } from '@luxcium/redis-services';
rConnect;
getPhashCompute;

void (async function main() {
  const R = await rConnect(6383);
  const phashCompute = getPhashCompute(R);
  console.log(
    await phashCompute(
      '/home/luxcium/projects/monorepo-one/public/imgs/unsplash-Toby Wong.jpg',
    ),
  );
  return phashCompute;
})();
