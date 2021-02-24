import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Column,
} from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customer: Customer;

  @ManyToOne(() => OrdersProducts, orderProduct => orderProduct.order)
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Order;
