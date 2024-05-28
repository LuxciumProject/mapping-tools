import type { MapperOptions } from '../../types';

export const defaultMapperOptions = <T, R>(
  mapperOptions: MapperOptions<T, R>
): Required<MapperOptions<T, R>> => ({
  transform: async (value) => value as any as R,
  lookup: (value, index, array) => void [value, index, array],
  validate: async (value, index, array) => void [value, index, array],
  errLookup: (value, index, currentRejection) => void [value, index, currentRejection],
  ...mapperOptions,
});
