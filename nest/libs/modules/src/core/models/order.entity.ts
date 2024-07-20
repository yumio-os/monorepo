import { BaseEntity, Entity } from 'typeorm';

import { ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Order extends BaseEntity {
  id: number;
  type: 'pickup' | 'delivery';
  dpId: number;

  total: number;
  discount: number;
  tax: number;
  delivery: number;

  status: 'created' | 'accepted' | 'in-progress' | 'ready-for-pickup' | 'in-delivery' | 'delivered' | 'cancelled' | 'rejected';

  basketId?: number;

  itemsInternal: any; // jsonb blob
  itemStats: any; // 4th item object for stats
}
