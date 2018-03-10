import { getCustomRepository, Repository } from 'typeorm';

/**
 * Create an asynchronous component which allows injecting a
 * custom repository into a module.
 *
 * @param repositoryClass Custom Repository class to be injected.
 *
 * @return Injectable {provide: string, useFactory: () => Promise<Repository<any>>}
 */
export function customRepository(repositoryClass: new () => Repository<any>) {
  return {
    provide: repositoryClass.name,
    useFactory: async () => getCustomRepository(repositoryClass),
  };
}
