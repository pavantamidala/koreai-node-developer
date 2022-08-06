import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  quantitiy: number;
  @ApiProperty()
  @IsString()
  address: string;
  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsNumber()
  @IsPhoneNumber()
  contactNumber: number;
  @ApiProperty()
  @IsString()
  status: string;
  @ApiProperty()
  @IsString()
  orderedDate: string;
}
