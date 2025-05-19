import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Model } from 'mongoose';
import { ISubmission, SubmissionStatus } from '@/common/interfaces';

@Schema({ timestamps: true })
export class Submission implements ISubmission {
  declare _id?: Types.ObjectId;
  declare createdAt?: Date;
  declare updatedAt?: Date;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Contest' })
  contestId: Types.ObjectId;

  @Prop({ required: true, enum: SubmissionStatus })
  status: SubmissionStatus;

  @Prop({ type: Number, default: 0 })
  score?: number;

  @Prop({ required: true, type: Date })
  startedAt: Date;

  @Prop({ type: Date })
  submittedAt?: Date;
}

export type SubmissionDocument = HydratedDocument<Submission>;
export type SubmissionModel = Model<SubmissionDocument>;
export const SubmissionSchema = SchemaFactory.createForClass(Submission);
