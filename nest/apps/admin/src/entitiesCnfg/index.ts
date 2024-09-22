import { getMetadataArgsStorage } from 'typeorm';

import {
  BrandBaseItem,
  BusinessBaseItem,
  DeliveryPlatformLocation,
  Location,
  Menu,
  MenuAddon,
  MenuBaseItem,
  Site,
} from '@yumio/modules/core';

export function configureEntity(entity, Components) {
  const columns = getMetadataArgsStorage()
    .filterColumns(entity)
    .reduce((acc, column) => {
      // Check if the column type is jsonb and configure accordingly
      // if (column.options.type === 'jsonb') {
      //   acc[column.propertyName] = {
      //     components: {
      //       edit: Components.GenericJsonEdit,
      //       // show: Components.GenericJsonShow,
      //     },
      //   };
      // }
      return acc;
    }, {});

  return {
    resource: entity,
    options: {
      properties: columns,
      actions: {
        edit: {
          before: async (request, context) => {
            console.log('Before edit action:', request.payload);
            // Perform any modifications or additional checks here
            return request;
          },
        },
        // Define other actions or customize them similarly
      },
    },
  };
}

export function configureEntityJson(entity, Components, exclude = []) {
  const columns = getMetadataArgsStorage()
    .filterColumns(entity)
    .reduce((acc, column) => {
      // Check if the column type is jsonb and configure accordingly
      if (exclude.includes(column.propertyName)) {
        return acc;
      }
      if (column.options.type === 'jsonb') {
        acc[column.propertyName] = {
          components: {
            edit: Components.GenericJsonEdit,
            show: Components.GenericJsonShow,
          },
        };
      }
      return acc;
    }, {});

  return {
    resource: entity,
    options: {
      properties: columns,
      actions: {
        edit: {
          before: async (request, context) => {
            console.log('Before edit action:', request.payload);
            // Perform any modifications or additional checks here
            return request;
          },
        },
        // Define other actions or customize them similarly
      },
    },
  };
}

export function getBusinesBaseItem(Components) {
  const entity = configureEntity(BusinessBaseItem, Components);
  attachImages(entity.options.properties, 'images');
  return entity;
}

export function getSite(Components) {
  const entity = configureEntity(Site, Components);
  attachImages(entity.options.properties, 'images');
  return entity;
}

export function getBrandBaseItem(Components) {
  const entity = configureEntity(BrandBaseItem, Components);
  attachImages(entity.options.properties, 'images');
  return entity;
}

export function getLocation(Components) {
  const entity = configureEntity(Location, Components);
  attachTax(entity.options.properties, 'tax');

  return entity;
}

export function getMenu(Components) {
  const entity = configureEntity(Menu, Components);
  attachImages(entity.options.properties, 'images');
  return entity;
}

export function getDeliveryPlatformLocation(Components) {
  const entity = configureEntityJson(DeliveryPlatformLocation, Components);
  return entity;
}

export function getMenuBaseItem(Components) {
  const entity = configureEntity(MenuBaseItem, Components);
  attachImages(entity.options.properties, 'images');
  attachTax(entity.options.properties, 'tax');
  attachDiscount(entity.options.properties, 'discount');
  return entity;
}

export function getMenuAddon(Components) {
  const entity = configureEntityJson(MenuAddon, Components, ['images', `logic`]);
  attachImages(entity.options.properties, 'images');
  attachLogic(entity.options.properties, 'logic');
  return entity;
}

function attachLogic(ref: any, key: string) {
  ref[`${key}.min`] = {
    type: 'number',
  };

  ref[`${key}.max`] = {
    type: 'number',
  };

  ref[`${key}.repeat`] = {
    type: 'boolean',
  };
}

function attachImages(ref: any, key: string) {
  ref[`${key}.default`] = {
    type: 'string',
  };

  ref[`${key}.defaultLowRes`] = {
    type: 'string',
  };

  ref[`${key}.thumbnail`] = {
    type: 'string',
  };

  ref[`${key}.thumbnailLowRes`] = {
    type: 'string',
  };
}

function attachTax(ref: any, key: string) {
  ref[`${key}.taxRate`] = {
    type: 'number',
  };

  ref[`${key}.inclusive`] = {
    type: 'boolean',
  };
}

function attachDiscount(ref: any, key: string) {
  ref[`${key}.amount`] = {
    type: 'number',
  };

  ref[`${key}.amountPer`] = {
    type: 'number',
  };

  ref[`${key}.maxDiscount`] = {
    type: 'number',
  };

  ref[`${key}.maxDiscountPer`] = {
    type: 'number',
  };
}
