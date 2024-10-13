import { ConfigService } from '@nestjs/config';
import { Context, Field, ObjectType, Query, Resolver } from '@nestjs/graphql';

import { name, version } from '../../../package.json';
import { IContext } from './common/model/context';

@ObjectType()
class App {
  @Field()
  name: string;

  @Field()
  version: string;

  @Field()
  activeProfile: string;
}

@Resolver()
export class AppResolver {
  constructor(private config: ConfigService) {}

  @Query(() => App)
  async app(@Context() context: IContext): Promise<App> {
    const ACTIVE_PROFILE = this.config.get('app.ACTIVE_PROFILE');
    return {
      name,
      version,
      activeProfile: ACTIVE_PROFILE,
    };
  }
}
