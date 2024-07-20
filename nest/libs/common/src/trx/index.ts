import { EntityManager } from 'typeorm';

export type GenericOpts = {
  trxEntityManager?: EntityManager;
  context?: any;
};
