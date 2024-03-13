import { IsString, MinLength, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';
export class CreateAuthDto {
  @ApiProperty({
      default: 'Fabio Ronald',
      description: 'Nombres del usuario'
  })
  @IsString()
  @MinLength(1)
  firstname: string;

  @ApiProperty({
    default: 'Zacari Carillo',
    description: 'Apellidos del usuario'
  })
  @IsString()
  @MinLength(1)
  lastname: string;

  @ApiProperty({
    default: 'fzacari@gmail.com',
    description: 'Correo eletrónico del usuario'
  })
  @IsString()
  @MinLength(1)
  email: string;

  @ApiProperty({
    default: '123456',
    description: 'Password del usuario'
  })
  @IsString()
  @MinLength(1)
  password: string;
}
