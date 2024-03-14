import { IsString, MinLength, IsOptional, IsNotEmpty, IsBoolean, IsArray, isEmail, IsEmail, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
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
  @IsEmail()
  @MinLength(1)
  email: string;

  @ApiProperty({
    default: 'Abc123',
    description: 'Password del usuario'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;

  @ApiProperty({
    default: true,
    description: 'Estado del usuario'
  })
  @IsBoolean()
  isActive: boolean;


  @ApiProperty({
    type: [String],
    default: ['user'],
    description: 'Rol del usuario'
  })
  @IsArray()
  roles: string[];


}
