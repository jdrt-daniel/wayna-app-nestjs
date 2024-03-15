import { AuthController }       from './auth.controller';
import { AuthService }          from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule }            from '@nestjs/jwt';
import { Module }               from '@nestjs/common';
import { MongooseModule }       from '@nestjs/mongoose';
import { PassportModule }       from '@nestjs/passport';
import { User, UserSchema }     from './entities/user.entity'
import { JwtStrategy }          from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports:[
    ConfigModule,
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
  ],
  exports:[MongooseModule, JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}
