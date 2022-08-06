import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Order } from './entities/order.entity';

const TOTAL_CAPACITY = 2000; // LITERS

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}
  create(createOrderDto: CreateOrderDto | any) {
    const order = this.repo.create(createOrderDto);
    return this.repo.save(order);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);

    if (!order) {
      throw new NotFoundException('Order Not Found');
    }
    Object.assign(order, updateOrderDto);
    return this.repo.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);

    if (!order) {
      throw new NotFoundException('Order Not Found');
    }
    return this.repo.remove(order);
  }

  async updateStatus(id: number, updateStatusDto: UpdateStatusDto) {
    const order = await this.findOne(id);

    if (!order) {
      throw new NotFoundException('Order Not Found');
    }
    Object.assign(order, updateStatusDto);
    return this.repo.save(order);
  }

  async checkCapacity() {
    return this.repo
      .createQueryBuilder('order')
      .select('SUM(order.quantitiy)', 'availableCapacity')
      .getRawOne()
      .then((raw) => {
        console.log(raw);
        return {
          availableCapacity: TOTAL_CAPACITY - raw.availableCapacity,
        };
      });
  }
}
