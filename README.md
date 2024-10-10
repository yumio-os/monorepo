# YumioOS

YumioOS is an open-source project designed to empower entrepreneurs who want to run their own food trucks or small restaurant chains. This project missiion is to provides a comprehensive suite of tools to manage all aspects of your food business, from orders and menus to inventory, customer management, and reporting.

The core components of YumioOS are free and open-source, allowing anyone to set up and run their own operations efficiently (getting orders from external sources as well). Setup their own system locally, or in futute use hosted one. If the project picks up, future releases will introduce optional premium features for businesses seeking enhanced visual customizations and federated operations.

## Features

### Core Features (Open Source - ALSO WORK IN PROGRESS),

- Menu Management
- Site Management
- Brand Management
- Stock Tracking
- Integration With External Ordering Platform (manual setting up)
- POS
- In Kitchen Order Monitoring (including main, and satelite stations and order flow)

The local management is based on TYPEORM and AdminJS integration. API is server as GQL schema. Frontend components are based on SolidJS

# Tech doc

## NESTJS (nest/\*)

#### Docker

Dockerfiles in the `apss/<app>`. Build from root with `-f` (like in CI builds).

#### ENV

All the envs are in the `.`. When adding new, make your example/test.

#### Buidling with nest

Using nest commands take care of most stuff. But check the webpack, nest-cli (libs build with webpac) and other files around (tsconfig/packag).

### APPS

apps/yumio - gql
apps/admin - global backend
apps/webApp - ordering platform, web kiosk prototype

### LIBS (@yumio/\*)

libs/common
libs/modules

### CI/CD/CodeScan

Security based on `trivvy` action.
