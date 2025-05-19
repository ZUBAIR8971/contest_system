import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { IContest, ContestAccessLevel } from '@/common/interfaces';
import { MongooseId } from 'src/common/interfaces/common';

@Schema({ timestamps: true })
export class Contest implements IContest {
  declare _id?: MongooseId;
  declare createdAt?: Date;
  declare updatedAt?: Date;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Date })
  startTime: Date;

  @Prop({ required: true, type: Date })
  endTime: Date;

  @Prop({ required: true })
  prize: string;

  @Prop({ required: true, enum: ContestAccessLevel })
  accessLevel: ContestAccessLevel;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Question' }],
    default: [],
  })
  questions?: Types.ObjectId[];

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export type ContestDocument = HydratedDocument<Contest>;
export type ContestModel = Model<ContestDocument>;
export const ContestSchema = SchemaFactory.createForClass(Contest);
