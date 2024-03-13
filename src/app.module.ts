import { Module }                      from '@nestjs/common';
import { AppController }               from './app.controller';
import { AppService }                  from './app.service';
import { AuthModule }                  from './auth/auth.module';
import { MongooseModule }              from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath:'.env' }),
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
