import { ApiTags, ApiResponse, ApiOperation }                    from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Headers }     from '@nestjs/common';
import { AuthService }                                           from './auth.service';
import { CreateUserDto, UpdateUserDto, LoginUserDto}             from './dto/index';
import { User }                                                  from './entities/user.entity';
import { AuthGuard }                                             from '@nestjs/passport';
import { Auth, GetUser, RawHeaders, RoleProtected }              from './decorators';
import { IncomingHttpHeaders }                                   from 'http';
import { UserRoleGuard }                                         from './guards/user-role.guard';
import { ValidRoles }                                            from './interfaces';

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

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus( user );
  }


  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user:User,
    @GetUser('email') userEmail:string,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers:IncomingHttpHeaders
  ){

    return {
      ok:true,
      message: 'Hola mundo Private',
      user,
      userEmail,
      rawHeaders,
      headers
    }
  }



  //@SetMetadata('roles', ['admin', 'super-user'])
  @Get('private2')
  @RoleProtected( ValidRoles.superUser, ValidRoles.admin, ValidRoles.user )
  @UseGuards( AuthGuard(), UserRoleGuard )
  privateRoute2(
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
    }
  }

  @Get('private3')
  @Auth( ValidRoles.admin )
  privateRoute3(
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
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
