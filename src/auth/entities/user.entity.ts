import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document }                    from 'mongoose';
import { ApiProperty }                 from '@nestjs/swagger/dist';

@Schema()
export class User extends Document {
  @ApiProperty({ example: 'Pedro Iver', description: 'Nombres del usuario', required: true })
  @Prop({ required: true, index: true })
  firstname: string;

  @ApiProperty({ example: 'Choque Quispe', description: 'Apellidos del usuario', required: true })
  @Prop({ required: true, index: true })
  lastname: string;

  @ApiProperty({ example: 'ejemplo123@gmail.com', description: 'Correo electrónico', required: true })
  @Prop({ unique: true, index: true, required: true })
  email: string;

  @ApiProperty({ example: '123456789', description: 'Password', required: true })
  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  isActive: boolean;

  @Prop({ type: [String], required: true, default: ['user'] })
  roles: string[];


}


export const UserSchema = SchemaFactory.createForClass(User);
