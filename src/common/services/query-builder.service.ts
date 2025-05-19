import { QueryOptions } from '@/common/base/query-options.interface';

export class QueryBuilder {
  private pipeline: any[] = [];

  constructor(
    private options: QueryOptions,
    private searchableFields: string[] = [],
  ) {}

  build(): any[] {
    this.applySearch();
    this.applyFilters();
    this.applySort();
    this.applyPagination();
    return this.pipeline;
  }

  private applySearch() {
    if (this.options.search && this.searchableFields.length > 0) {
      this.pipeline.push({
        $match: {
          $or: this.searchableFields.map((field) => ({
            [field]: { $regex: this.options.search, $options: 'i' },
          })),
        },
      });
    }
  }

  private applyFilters() {
    if (this.options.filters && Object.keys(this.options.filters).length > 0) {
      this.pipeline.push({
        $match: this.options.filters,
      });
    }
  }

  private applySort() {
    if (this.options.sortBy) {
      this.pipeline.push({
        $sort: { [this.options.sortBy]: this.options.sortOrder || -1 },
      });
    }
  }

  private applyPagination() {
    if (typeof this.options.skip === 'number') {
      this.pipeline.push({ $skip: this.options.skip });
    }
    if (typeof this.options.limit === 'number') {
      this.pipeline.push({ $limit: this.options.limit });
    }
  }
}
