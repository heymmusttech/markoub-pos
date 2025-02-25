import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    example: 'Vendor User',
    description: 'Name of the user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: 'vendor@markoub.ma',
    description: 'Email of the user',
  })
  @IsEmail()
  email: string;
}