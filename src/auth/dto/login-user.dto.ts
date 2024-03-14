import { IsString, MinLength, IsEmail, MaxLength, Matches } from 'class-validator';
import { ApiProperty }                                      from '@nestjs/swagger';
export class LoginUserDto {
  

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

 
}
