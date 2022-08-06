import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateStatusDto extends PartialType(CreateOrderDto) {
  @ApiProperty()
  @IsString()
  status: string;
}
