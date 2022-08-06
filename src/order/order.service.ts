import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { DateDto } from './dto/date-dto';
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

  async checkCapacity(dateDto: DateDto) {
    console.log(dateDto);
    return (
      this.repo
        .createQueryBuilder('order')
        .where(`order.orderedDate=:orderedDate`, {
          orderedDate: dateDto.orderedDate,
        })
        .getMany()
        // .select('SUM(order.quantitiy)', 'availableCapacity')
        // .getRawOne()
        .then((raw) => {
          console.log(raw);
          let totalTaken: any = raw.map((o) => o.quantitiy);
          totalTaken = totalTaken.reduce((a, b) => a + b, 0);
          return {
            availableCapacity: TOTAL_CAPACITY - totalTaken,
          };
        })
    );
  }
}

// **To Know more about each api refer the following swagger documentation link**
// [kore-ai-node-developer.herokuapp.com/docs][1]{:target='_blank'}

// **Deployed Version Link :**
// [kore-ai-node-developer.herokuapp.com/docs][2]{:target='_blank'}
// **Source Code Link:**
// [github.com/pavantamidala/koreai-node-developer][3]{:target='_blank'}

// **Installation Guide**
//  - you can follow the readme file for instructions to setup in your local

// **Used Libraries and Framework**
//  - Nest Js (Node js Framework)
//  - Swagger (for documentation)
//  - Class validator (for validations)
//  - Sqlite database (for data storage)
//  - Typeorm
//  - pnpm (as a package manager)

//   [1]: https://kore-ai-node-developer.herokuapp.com/docs
//   [2]: https://kore-ai-node-developer.herokuapp.com/docs
//   [3]: https://github.com/pavantamidala/koreai-node-developer
