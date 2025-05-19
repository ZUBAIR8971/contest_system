import { Injectable } from '@nestjs/common';
import { Document, FilterQuery, Model, SortOrder, Types, UpdateQuery } from 'mongoose';

@Injectable()
export abstract class BaseRepository<
  T extends Document,
  U extends Omit<T, keyof Document | '__v'>,
> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Omit<U, 'id'>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string | Types.ObjectId, includeDeleted = false): Promise<T | null> {
    let filter: FilterQuery<T> = { _id: id };
    if (!includeDeleted) filter = { ...filter, isDeleted: { $ne: true } };

    return this.model.findOne(filter).exec();
  }

  async findOne(filter: FilterQuery<U>, includeDeleted = false): Promise<T | null> {
    const queryFilter = { ...filter, ...(includeDeleted ? {} : { isDeleted: { $ne: true } }) };
    return this.model.findOne(queryFilter as FilterQuery<T>).exec();
  }

  async find(
    filter: FilterQuery<U>,
    options?: {
      sort?: string | Record<string, SortOrder> | [string, SortOrder][];
      skip?: number;
      limit?: number;
      includeDeleted?: boolean;
    },
  ): Promise<T[]> {
    const queryFilter = {
      ...filter,
      ...(options?.includeDeleted ? {} : { isDeleted: { $ne: true } }),
    };

    let query = this.model.find(queryFilter as FilterQuery<T>);

    if (options?.sort) query = query.sort(options.sort);
    if (options?.skip) query = query.skip(options.skip);
    if (options?.limit) query = query.limit(options.limit);

    return query.exec();
  }

  async update(id: string | Types.ObjectId, data: UpdateQuery<U> | Partial<U>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data as UpdateQuery<T>, { new: true }).exec();
  }

  /**
   * Soft delete: Marks the document as deleted instead of removing it from the DB
   */
  async delete(id: string | Types.ObjectId): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, { isDeleted: true } as unknown as Partial<T>, { new: true })
      .exec();
  }

  /**
   * Restore: Allows recovery of a soft-deleted record
   */
  async restore(id: string | Types.ObjectId): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, { isDeleted: false } as unknown as Partial<T>, { new: true })
      .exec();
  }

  async count(filter: FilterQuery<U>, includeDeleted = false): Promise<number> {
    const queryFilter = { ...filter, ...(includeDeleted ? {} : { isDeleted: { $ne: true } }) };
    return this.model.countDocuments(queryFilter as FilterQuery<T>).exec();
  }
}
