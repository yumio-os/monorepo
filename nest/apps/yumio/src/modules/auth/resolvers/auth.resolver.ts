import { ConfigService } from '@nestjs/config';
import { Resolver } from '@nestjs/graphql';

import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private config: ConfigService,
    private authService: AuthService,
  ) {}


  // @Query(() => ApiKey, { nullable: true })
  // @UseGuards(AuthGuardInfo)
  // async kioskDeviceInfo(@Context() context: IContext) {
  //   return context?.apiKeyDetails;
  // }

  // @Mutation(() => LockApiKeyResponse, { deprecationReason: 'renamed to kioskLockApiKey' })
  // @UseGuards(ApiKeyV2Guard)
  // async lockApiKey(@Context() context: IContext, @Args() { deviceId, reader }: ArgsLockApiToken) {
  //   return this.kioskLockApiKey(context, { deviceId, reader });
  // }

  // @Mutation(() => LockApiKeyResponse)
  // @UseGuards(ApiKeyV2Guard)
  // async kioskLockApiKey(
  //   @Context() context: IContext,
  //   @Args() { deviceId, reader }: ArgsLockApiToken,
  // ) {
  //   try {
  //     const curatedDeviceId = deviceId || context.deviceId || context.userSessionId;
  //     let apiKey;
  //     let reader: Stripe.Terminal.Reader = null;
  //     const siteId = context.siteId || context.serviceAreaId;

  //     await Promise.allSettled([
  //       new Promise<void>(async (resolve) => {
  //         apiKey = await this.authService.getKioskTokenNonCached(context.apiKey);
  //         resolve();
  //       }),
  //       new Promise<void>(async (resolve) => {
  //         try {
  //           reader = null;
  //         } catch (err) {
  //           // ignore
  //         }
  //         resolve();
  //       }),
  //     ]);

  //     if (!apiKey) {
  //       return { message: `Could not access the key` };
  //     }
  //     const apiKeySaved = await this.authService.lockApiKeyToDeviceId(
  //       apiKey,
  //       curatedDeviceId,
  //       reader,
  //       siteId,
  //     );

  //     if (!apiKeySaved) {
  //       return { message: `Could not lock the key` };
  //     }

  //     return <LockApiKeyResponse>{
  //       apiKey: apiKeySaved,
  //       reader: StripeMapper.mapToReaderFull(reader),
  //     };
  //   } catch (err) {
  //     return { message: err.message };
  //   }
  // }

  // @Mutation(() => LockApiKeyResponse, {
  //   description:
  //     'either bind new terminal to apiKey, or unbind previous one if reader is null. Does not destroy stipe terminal object, just removes the link between the two.',
  // })
  // @UseGuards(ApiKeyV2Guard)
  // async kioskRegisterTerminal(
  //   @Context() context: IContext,
  //   @Args() { reader }: ArgsRegisterTerminal,
  // ): Promise<LockApiKeyResponse> {
  //   try {
  //     // const curatedDeviceId = context.deviceId || context.userSessionId;
  //     let apiKey;
  //     let reader: Stripe.Terminal.Reader = null;
  //     let errors = [];
  //     const siteId = context.siteId || context.serviceAreaId;

  //     await Promise.allSettled([
  //       new Promise<void>(async (resolve) => {
  //         try {
  //           apiKey = await this.authService.getKioskTokenNonCached(context.apiKey);
  //         } catch (err) {
  //           errors.push(err.message);
  //         }
  //         resolve();
  //       }),
  //       new Promise<void>(async (resolve) => {
  //         try {
            
  //           reader = null;
  //         } catch (err) {
  //           errors.push(err.message);
  //         }
  //         resolve();
  //       }),
  //     ]);

  //     if (!apiKey) {
  //       return { message: `Could not access the key. ${errors.join(' ')}` };
  //     }

  //     if (!reader) {
  //       return { message: `Could not register the reader. ${errors.join(' ')}` };
  //     }
  //     const apiKeySaved = await this.authService.replaceReader(apiKey, reader);

  //     Logger.log(`DEBUG registerTerminal`, { reader, apiKey });

  //     return <LockApiKeyResponse>{
  //       apiKey: apiKeySaved,
  //       reader: StripeMapper.mapToReaderFull(reader),
  //     };
  //   } catch (err) {
  //     return { message: err.message };
  //   }
  // }

}
