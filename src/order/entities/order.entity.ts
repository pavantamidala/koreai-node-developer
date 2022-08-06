import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantitiy: number;
  @Column()
  address: string;
  @Column()
  username: string;
  @Column()
  contactNumber: number;
  @Column()
  status: string;
  @Column({ default: '06-08-2022' })
  orderedDate: string;

  @AfterInsert()
  insert() {
    console.log(`insterted user with id ${this.id}`);
  }

  @AfterRemove()
  remove() {
    console.log(`removed user with id ${this.id}`);
  }

  @AfterUpdate()
  update() {
    console.log(`updated user with id ${this.id}`);
  }
}
