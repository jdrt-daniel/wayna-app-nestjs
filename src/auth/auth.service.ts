import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, HttpStatus, HttpException, UnauthorizedException  } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, LoginUserDto}   from './dto';
import { InjectModel }                                 from '@nestjs/mongoose';
import { Model }                                       from 'mongoose';
import { User }                                        from './entities/user.entity';
import * as bcrypt                                     from 'bcrypt';
import { JwtPayload }                                  from './interfaces/jwt-payload.interface';
import { JwtService }                                  from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(

    @InjectModel(User.name)
    private readonly UsersModel:Model<User>,

    private readonly jwtService: JwtService
    
  ) {}


  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto
      const hashedPassword = bcrypt.hashSync(password, 10);
      //const result = await this.UsersModel.create(createUserDto);
      const user = await this.UsersModel.create({
        ...userData,
        password: hashedPassword
      });
      // Eliminar la propiedad password del objeto user
      delete user.password
      const token = this.getJwtToken({ id: user._id });
      return {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        isActive: user.isActive,
        roles: user.roles,
        token
      };
    } catch (error) {
      this.handleExceptions( error );
    }
    
  }

  async login(loginUserDto:LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.UsersModel.findOne(
      { email }, // Objeto de búsqueda directo
      { email: 1, password: 1, _id: 1 } // Proyección para incluir solo email y password quitando el _id
    );
    if(!user)
      throw new UnauthorizedException('Credentials are not valid (email)');
    if(!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');
     const token = this.getJwtToken({ id: user._id });
    return {
      id:user._id,
      email: user.email,
      password: user.password,
      token
    };
  }

  async checkAuthStatus( user: User ){
    return {
      id:user._id,
      email: user.email,
      password: user.password,
      token: this.getJwtToken({ id: user.id })
    };
   

  }
  
  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign( payload );
    return token;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private handleExceptions( error: any ):never {
    if ( error.code === 11000 ) {
      throw new BadRequestException(`Existe en la BD ${ JSON.stringify( error.keyValue ) }`);
    }
    throw new InternalServerErrorException(`Revisa los logs`);
  }
}
