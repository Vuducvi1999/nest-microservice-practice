import { Logger, NotFoundException } from '@nestjs/common'
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose'
import { AbstractSchema } from './abstract.schema'

export class AbstractRepository<TDocument extends AbstractSchema> {
  protected readonly logger: Logger
  constructor(private readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>) {
    const createdDocument = await this.model.create({
      ...document,
      _id: new Types.ObjectId(),
    })

    return createdDocument.toJSON() as TDocument
  }

  async findOne(filter: FilterQuery<TDocument>) {
    const document = await this.model.findOne(filter).lean<TDocument>(true)

    if (!document) {
      this.logger.warn('Document was not found by ', filter)
      throw new NotFoundException('Document not found')
    }

    return document
  }

  async findOneAndUpdate(
    filter: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model
      .findOneAndUpdate(filter, update)
      .lean<TDocument>(true)

    if (!document) {
      this.logger.warn('Document was not found to update ', filter)
      throw new NotFoundException('Document not found')
    }

    return document
  }

  async find(filter: FilterQuery<TDocument>) {
    return this.model.find(filter).lean<TDocument>(true)
  }

  async findOneAndDelete(filter: FilterQuery<TDocument>) {
    return this.model.findOneAndDelete(filter).lean<TDocument>(true)
  }
}
