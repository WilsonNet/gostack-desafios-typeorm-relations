import { container } from 'tsyringe';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import RepositoryNames from './RepositoryNames';

// TODO

container.registerSingleton<ICustomersRepository>(
  RepositoryNames.CUSTOMERS_REPOSITORY,
  CustomersRepository,
);

container.registerSingleton<IProductsRepository>(
  RepositoryNames.PRODUCTS_REPOSITORY,
  ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
  RepositoryNames.ORDERS_REPOSITORY,
  OrdersRepository,
);
