import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';
import RepositoryNames from '@shared/container/RepositoryNames';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject(RepositoryNames.ORDERS_REPOSITORY)
    private ordersRepository: IOrdersRepository,
    @inject(RepositoryNames.PRODUCTS_REPOSITORY)
    private productsRepository: IProductsRepository,
    @inject(RepositoryNames.CUSTOMERS_REPOSITORY)
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    // TODO
  }
}

export default CreateOrderService;
