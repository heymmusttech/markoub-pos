import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
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

  @ApiProperty({
    required: true,
    example: 'P@ssw0rd',
    description: 'Password of the user',
  })
  @IsString()
  password: string;
}