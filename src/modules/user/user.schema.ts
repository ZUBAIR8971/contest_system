import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { IUser, RoleTypes } from 'src/common/interfaces';

import { MongooseId } from '@/common/interfaces/common';

@Schema({
  timestamps: true,
})
export class User implements IUser {
  declare _id?: MongooseId;
  declare createdAt?: Date;
  declare updatedAt?: Date;

  @Prop({ required: false })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  isVerified?: boolean;

  @Prop({ required: true, enum: RoleTypes })
  role: RoleTypes;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

export type UserModel = Model<UserDocument>;
