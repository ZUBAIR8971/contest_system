import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Model } from 'mongoose';
import { IQuestion, QuestionType } from '@/common/interfaces';
import { MongooseId } from 'src/common/interfaces/common';

@Schema({ timestamps: true })
export class Question implements IQuestion {
  declare _id?: MongooseId;
  declare createdAt?: Date;
  declare updatedAt?: Date;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Contest' })
  contestId: Types.ObjectId;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true, enum: QuestionType })
  type: QuestionType;

  @Prop({ required: true, type: [String] })
  options: string[];

  @Prop({ required: true, type: [String] })
  correctAnswers: string[];

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;
}

export type QuestionDocument = HydratedDocument<Question>;
export type QuestionModel = Model<QuestionDocument>;
export const QuestionSchema = SchemaFactory.createForClass(Question);
