/* eslint-disable prefer-const */
import { FilterQuery, Query } from 'mongoose';

export class QueryBuilder<T> {
  public query: Record<string, unknown>; //payload
  public modelQuery: Query<T[], T>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.query = query;
    this.modelQuery = modelQuery;
  }

  search(searchableFields: string[]) {
    let searchTerm = '';

    if (this.query?.searchTerm) {
      searchTerm = this.query.searchTerm as string;
    }

    this.modelQuery = this.modelQuery.find({
      $or: searchableFields.map(
        (field) =>
          ({
            [field]: new RegExp(searchTerm, 'i'),
          } as FilterQuery<T>)
      ),
    });

    return this;
  }

  paginate() {
    let limit: number = Number(this.query?.limit || 10);
    let skip: number = 0;

    if (this.query?.page) {
      const page: number = Number(this.query?.page || 1);
      skip = Number((page - 1) * limit);
    }

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  sort() {
    let sort = '-createdAt'; // Default sorting by creation date

    // Check if sorting by upvotes is requested
    if (this.query?.sort) {
      sort = this.query.sort as string;
      if (this.query?.sort === 'upvotes' || this.query?.sort === 'downvotes') {
        this.modelQuery = this.modelQuery.sort({ sort: -1 }); // Sort by virtual field
      } else {
        this.modelQuery = this.modelQuery.sort(sort);
      }
    } else {
      // Fallback to sorting by creation date
      this.modelQuery = this.modelQuery.sort(sort);
    }

    return this;
  }

  fields() {
    let fields = '';

    if (this.query?.fields) {
      fields = (this.query?.fields as string).split(',').join(' ');
    }

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['searchTerm', 'page', 'limit', 'sortBy', 'fields'];

    excludeFields.forEach((e) => delete queryObj[e]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }
}
