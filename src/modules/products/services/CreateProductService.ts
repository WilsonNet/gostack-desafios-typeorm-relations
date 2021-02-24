import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import RepositoryNames from '@shared/container/RepositoryNames';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject(RepositoryNames.PRODUCTS_REPOSITORY)
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const checkNameExists = await this.productsRepository.findByName(name);

    if (checkNameExists) {
      throw new AppError('Product with current name already exists');
    }

    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });

    console.log("🚀 ~ file: CreateProductService.ts ~ line 34 ~ CreateProductService ~ execute ~ product", product)

    return product;
  }
}

export default CreateProductService;
