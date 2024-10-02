import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey } from '@yumio/modules/apiKey';
import {
  Brand,
  BrandBaseItem,
  Business,
  BusinessBaseItem,
  DeliveryPlatform,
  DeliveryPlatformLocation,
  Location,
  Menu,
  MenuAddon,
  MenuAddonItem,
  MenuBaseItem,
  MTMMenuItemToMenuTag,
  Site,
  StockLevel,
  Tag,
  TagMenu,
  User,
} from '@yumio/modules/core';

import { IAppConfig } from '../../config/config.interface';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      // some type issue, docs says that normal injection should be good
      // https://docs.nestjs.com/techniques/database
      useFactory: <any>((configService: ConfigService) => ({
        type: configService.get<IAppConfig>('app').DB.TYPE,
        host: configService.get<IAppConfig>('app').DB.HOSTNAME,
        port: configService.get<IAppConfig>('app').DB.PORT,
        username: configService.get<IAppConfig>('app').DB.USERNAME,
        password: configService.get<IAppConfig>('app').DB.PASSWORD,
        database: configService.get<IAppConfig>('app').DB.DATABASE,
        entities: [
          ApiKey,
          Brand,
          StockLevel,
          MTMMenuItemToMenuTag,
          Tag,
          TagMenu,
          DeliveryPlatform,
          DeliveryPlatformLocation,
          BusinessBaseItem,
          Business,
          Location,
          MenuAddon,
          Menu,
          MenuBaseItem,
          MenuAddonItem,
          Site,
          BrandBaseItem,
          User,
        ],
        synchronize: configService.get<IAppConfig>('app').DB.SYNCHRONIZE,
        logging: configService.get<IAppConfig>('app').DB.LOGGING,
        cache: {
          type: 'ioredis',
          duration: 5000, // 5 seconds
          options: {
            host: configService.get<IAppConfig>('app').REDIS.HOST,
            password: configService.get<IAppConfig>('app').REDIS.PASSWORD,
            port: configService.get<IAppConfig>('app').REDIS.PORT,
            database: configService.get<IAppConfig>('app').REDIS.DB,
          },
        },
      })),
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
