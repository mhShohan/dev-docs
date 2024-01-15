import { Model } from 'mongoose';

class BaseServices<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  /**
   * create document into database
   * @param payload
   * @returns
   */
  async create(payload: Record<string, unknown>) {
    return this.model.create(payload);
  }

  /**
   * Get One Document by ObjectId
   * @param id ObjectId
   * @returns
   */
  async getSingleById(id: string) {
    await this._isExists(id);
    return this.model.findById(id);
  }

  /**
   * Get One Document by ObjectId
   * @param query
   * @returns
   */
  async getSingleByQuery(query: Record<string, unknown>) {
    return this.model.findOne(query);
  }

  /**
   * Get All document on query
   * @param query
   * @returns
   */
  async getAll(query: Record<string, unknown> = {}) {
    return this.model.find(query);
  }

  /**
   * update
   * @param id ObjectId
   * @param payload
   * @returns
   */

  async update(id: string, payload: Record<string, unknown>) {
    await this._isExists(id);
    return this.model.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  }

  /**
   * delete by ObjectId
   * @param id ObjectId
   */
  async delete(id: string) {
    await this._isExists(id);
    return this.model.findByIdAndDelete(id);
  }

  /**
   * Check data existence
   * @param id
   */
  protected async _isExists(id: string) {
    if (!(await this.model.findById(id))) {
      throw new CustomError(404, 'Data is not found!');
    }
  }
}

export default BaseServices;
