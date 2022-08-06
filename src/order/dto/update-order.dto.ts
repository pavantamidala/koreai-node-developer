import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  quantitiy: number;
  @IsOptional()
  @ApiProperty()
  @IsString()
  address: string;
  @IsOptional()
  @ApiProperty()
  @IsString()
  username: string;
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  @IsPhoneNumber()
  contactNumber: number;
  @IsOptional()
  @ApiProperty()
  @IsString()
  status: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  orderedDate: string;
}
