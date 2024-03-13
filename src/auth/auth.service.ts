import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, HttpStatus, HttpException  } from '@nestjs/common';
import { CreateAuthDto, UpdateAuthDto}   from './dto'
import { InjectModel }                   from '@nestjs/mongoose';
import { Model }                         from 'mongoose';
import { User }                          from './entities/user.entity';
@Injectable()
export class AuthService {
  constructor(

    @InjectModel(User.name)
    private readonly UsersModel:Model<User>
    
  ) {}


  async create(createAuthDto: CreateAuthDto) {
    try {
      console.log(createAuthDto);
      const result = await this.UsersModel.create(createAuthDto);
      console.log(result);
      return result;
    } catch (error) {
      this.handleExceptions( error );
    }
    
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private handleExceptions( error: any ) {
    if ( error.code === 11000 ) {
      throw new BadRequestException(`El rol existe en la BD ${ JSON.stringify( error.keyValue ) }`);
    }
    console.log(error);
    throw new InternalServerErrorException(`No puede crear el rol - Revisa los logs`);
  }
}
