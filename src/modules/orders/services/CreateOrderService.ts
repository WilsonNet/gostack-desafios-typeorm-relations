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
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with this ID');
    }

    const existingProducts = await this.productsRepository.findAllById(
      products,
    );

    if (!existingProducts) {
      throw new AppError('Could not find any products with the given ids');
    }

    const existingProductsId = existingProducts.map(product => product.id);

    const checkInexistingProducts = products.filter(
      product => !existingProductsId.includes(product.id),
    );

    if (checkInexistingProducts.length > 0) {
      throw new AppError(
        `Could not find product ${checkInexistingProducts[0]}`,
      );
    }

    const findProductsWithNoQuantityAvaiable = products.filter(
      product =>
        existingProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (findProductsWithNoQuantityAvaiable) {
      throw new AppError(
        `The quantity ${findProductsWithNoQuantityAvaiable} is not validy`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existingProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.create({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;
    const orderedProductsQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existingProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await this.productsRepository.updateQuantity(orderedProductsQuantity);

    return order;
  }
}

export default CreateOrderService;
