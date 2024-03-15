import { InjectModel }                       from "@nestjs/mongoose";
import { JwtPayload }                        from '../interfaces/jwt-payload.interface';
import { Model }                             from "mongoose";
import { PassportStrategy }                  from "@nestjs/passport";
import { ExtractJwt, Strategy }              from "passport-jwt";
import { User }                              from '../entities/user.entity';
import { ConfigService }                     from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    
    constructor(
        @InjectModel(User.name)
        private readonly UsersModel:Model<User>,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    
    async validate( payload:JwtPayload ): Promise<User>{
        const { id } = payload;
        const user = await this.UsersModel.findOne(
            { _id: id } // Utilizamos _id como campo de búsqueda
        );
        if(!user)
            throw new UnauthorizedException('Token not valid')

        if(!user.isActive)
            throw new UnauthorizedException('User is inactive, talk with an admin ')


        return user;
    }
}