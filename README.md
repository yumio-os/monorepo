# YumioOS

YumioOS is an open-source project designed to empower entrepreneurs who want to run their own food trucks or small restaurant chains. This project missiion is to provides a comprehensive suite of tools to manage all aspects of your food business, from orders and menus to inventory, customer management, and reporting.

The core components of YumioOS are free and open-source, allowing anyone to set up and run their own operations efficiently (getting orders from external sources as well). Setup their own system locally, or in futute use hosted one. If the project picks up, future releases will introduce optional premium features for businesses seeking enhanced visual customizations and federated operations.

## Core Features (Open Source - WORK IN PROGRESS),

- Menu Management
- Site Management
- Brand Management
- Stock Tracking
- Integration With External Ordering Platform
- Point of Sale System
- Visual Ordering Sytem
- Core API
- Ordering Platform API
- Order Lifecycle API
- In House Assistant

## Vision

First stage of the project, is to create a functional backbone of the system. Backone is supposed to stay an OpenSource project. What will be avaialable later, will be hosting service & federation model, where we aim to achieve a true mash network of points, that are coupled by hooking into federation layer.

## Tech

At the moment weapon of choice is NestJS (TS/NodeJS), running:

- Apollo GraphQL
- SolidJS Apps:
- Kiosk
- PoS
- VOS
- AdminJS

### AdminJS

As a way for early integration we did setup AdminJS as a way to setup a working data. This does not inferes any logic that we are planning at this point and would require for a person to have understanding of what are rules. We are planning to setup a separate doc about this, but it is under todo for now.

### GraphQL

Main API will consists of layer model/queries, giving granular access to data for range of appilaction:

- core: Gives full access to whole structure of db/ORM. This is gonna be accesible only to admin users, or admin level api keys
- op: Ordering Platform: public level API/models (optional JWT) for kiosk, ordering web pages
- ko: Kitchen Operations: private level API/models (required JWT) for PoS, VOS.
