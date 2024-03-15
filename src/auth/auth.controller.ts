import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards }     from '@nestjs/common';
import { AuthService }                                           from './auth.service';
import { CreateUserDto, UpdateUserDto, LoginUserDto}             from './dto/index';
import { User }                                                  from './entities/user.entity';
import { AuthGuard }                                             from '@nestjs/passport';

@ApiTags('Usuarios')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Creación de usuario' })
  @ApiResponse({status:201, description:'El usuario ha sido creado', type: User})
  @ApiResponse({status:400, description:'Bad request'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Logueo de usuario' })
  @ApiResponse({status:201, description:'El usuario se logueo'})
  @ApiResponse({status:400, description:'Bad request'})
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards( AuthGuard())
  testingPrivateRoute(){
    return {
      ok:true,
      message: 'Hola mundo Private'
    }
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
