import { Response } from 'express';

import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ApiKeyV2Guard } from '../../auth/guards/apiKey.guard';
import { CacheService } from '../../cache/service/cache.service';

@Controller('webhooks')
export class WebhooksController {
  // private topicOrders;
  // private topicStorefronts;

  constructor(
    // @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
  ) {
    // this.topicOrders = this.configService.get<IAppConfig>('app')!.PUBSUB.PUBSUB_TRACKING;
    // this.topicStorefronts = this.configService.get<IAppConfig>('app')!.PUBSUB.PUBSUB_INSTOCK;
  }

  @Post('/event')
  @HttpCode(200)
  @UseGuards(ApiKeyV2Guard) // TODO enabled the guard
  async orderUpdateHandler(
    @Res({ passthrough: true }) res: Response,
    @Body() payload: any,
    @Req() req: any, // take context from there like a good middleware boy you are
  ) {
    // const context = extractContext(req.webhookContext);

    // Logger.log(`Processing webhook order`, { context, payload });
    // try {
    //   // this.pubSub.publish(this.topicOrders, {});
    //   return { message: 'ok' };
    // } catch (error) {
    //   Logger.error(`Registration Webhook Error Order Webhook`, { context, error, payload });
    //   throw new HttpException(
    //     {
    //       error: error.message,
    //     },
    //     error?.extensions?.code || HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }
}

// function extractContext(expressContext) {
//   return <IContext>{
//     id: expressContext.id,
//     /** @deprecated use siteId */
//     serviceAreaId: expressContext.serviceAreaId,
//     siteId: expressContext.siteId,
//     timeZone: expressContext.timeZone,
//     locale: expressContext.locale,
//     user: expressContext.user,
//     jwt: expressContext.jwt,
//     deviceId: expressContext.deviceId,
//     firebaseDeviceId: expressContext.firebaseDeviceId,
//     userSessionId: expressContext.userSessionId,
//     apiKey: expressContext.apiKey,
//   };
// }
