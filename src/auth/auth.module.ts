import { AuthController }       from './auth.controller';
import { AuthService }          from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule }            from '@nestjs/jwt';
import { Module }               from '@nestjs/common';
import { MongooseModule }       from '@nestjs/mongoose';
import { PassportModule }       from '@nestjs/passport';
import { User, UserSchema }     from './entities/user.entity'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports:[ ConfigModule ],
      inject:[ ConfigService ],
      useFactory: ( configService:ConfigService ) => {
        // console.log('JWT Secret', configService.get('JWT_SECRET'));
        // console.log('JWT SECRET', process.env.JWT_SECRET);
        return {
          secret: process.env.JWT_SECRET,
          signOptions:{
            expiresIn: '2h'
          }
        }
      }
    })
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions:{
    //     expiresIn: '2h'
    //   }
    // })
  ],
  exports:[MongooseModule]
})
export class AuthModule {}
