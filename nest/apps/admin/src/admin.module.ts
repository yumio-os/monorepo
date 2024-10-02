import { Module } from '@nestjs/common';
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

import {
  getBrand,
  getBrandBaseItem,
  getBusinesBaseItem,
  getDeliveryPlatformLocation,
  getLocation,
  getMenu,
  getMenuAddon,
  getMenuBaseItem,
  getSite,
} from './entitiesCnfg';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      // Your TypeORM configuration here
      useFactory: <any>(() => ({
        type: <any>process.env[`DB_TYPE`], // or another database type
        host: process.env[`DB_HOSTNAME`],
        port: +process.env[`DB_PORT`],
        username: process.env[`DB_USERNAME`],
        password: process.env[`DB_PASSWORD`],
        database: process.env[`DB_DATABASE`],
        entities: [
          ApiKey,
          Brand,
          StockLevel,
          Tag,
          TagMenu,
          MTMMenuItemToMenuTag,
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
        synchronize: false, // Use cautiously in production
        logging: false,
      })),
    }),
    // AdminJS version 7 is ESM-only. In order to import it, you have to use dynamic imports.
    import('@adminjs/nestjs').then(async ({ AdminModule }) => {
      const AdminJSTypeorm = await import('@adminjs/typeorm');
      const { AdminJS, ComponentLoader } = await import('adminjs');

      const componentLoader = new ComponentLoader();

      const Components = {
        Dashboard: componentLoader.add('Dashboard', './components/dashboard/dashboard'),
        GenericJsonEdit: componentLoader.add(`GenericJsonEdit`, './components/jsonb/customJsonEdit'),
        GenericJsonShow: componentLoader.add(`GenericJsonShow`, './components/jsonb/customJsonShow'),

        // other
      };

      AdminJS.registerAdapter({
        Resource: AdminJSTypeorm.Resource,
        Database: AdminJSTypeorm.Database,
      });

      return AdminModule.createAdminAsync({
        useFactory: () => ({
          adminJsOptions: {
            rootPath: '/',
            resources: [
              User,
              ApiKey,
              // Site,
              getSite(Components),
              DeliveryPlatform,
              // tags

              // msa +
              getBrand(Components),
              getBrandBaseItem(Components), // BrandBaseItem,

              Business,
              getBusinesBaseItem(Components),

              getLocation(Components), // Location,
              getMenu(Components), // Menu
              getMenuBaseItem(Components), // MenuBaseItem,
              getMenuAddon(Components), // MenuAddon,
              MenuAddonItem,
              StockLevel,
              getDeliveryPlatformLocation(Components), // DeliveryPlatformLocation,
              Tag, // todo tag local
              TagMenu,
              MTMMenuItemToMenuTag,
            ],
            dashboard: {
              component: Components.Dashboard,
            },
            componentLoader,
          },
          // auth: {
          //   // authenticate,
          //   authenticate: async (email: string, password: string) => {
          //     const user = await User.findOne({ where: { email } });
          //     // if (user && (await bcrypt.compare(`${password}`, user.password))) {
          //     return <any>Promise.resolve(user);
          //     // }
          //     // return null;
          //   },
          //   cookieName: 'adminjs',
          //   cookiePassword: 'secret',
          // },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'secret',
          },
        }),
      });
    }),
  ],
  controllers: [],
  providers: [],
})
export class AdminModule {}
