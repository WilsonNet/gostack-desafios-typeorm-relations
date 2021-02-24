import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import RepositoryNames from '@shared/container/RepositoryNames';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject(RepositoryNames.CUSTOMERS_REPOSITORY)
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    // TODO
    const chekEmailExists = await this.customersRepository.findByEmail(email);

    if (chekEmailExists) {
      throw new AppError('Email adress already used');
    }

    const customer = await this.customersRepository.create({ email, name });

    return customer;
  }
}

export default CreateCustomerService;
