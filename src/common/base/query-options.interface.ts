export interface QueryOptions {
  search?: string;
  filters?: Record<string, any>;
  skip?: number;
  limit?: number;
  sortBy?: string;
  page: number;
  sortOrder?: 1 | -1;
}
