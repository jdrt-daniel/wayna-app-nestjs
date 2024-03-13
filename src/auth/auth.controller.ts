import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete }     from '@nestjs/common';
import { AuthService }                                           from './auth.service';
import { CreateAuthDto, UpdateAuthDto}                           from './dto/index';
import { User }                                                  from './entities/user.entity';

@ApiTags('Usuarios')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Creación de usuario' })
  @ApiResponse({status:201, description:'El usuario ha sido creado', type: User})
  @ApiResponse({status:400, description:'Bad request'})
  create(@Body() createAuthDto: CreateAuthDto) {
    console.log(createAuthDto);
    return this.authService.create(createAuthDto);
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
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
