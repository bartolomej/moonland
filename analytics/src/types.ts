// abstract query options, every service.query() function must support
export type AbstractQueryOptions = {
  limit?: number;
  skip?: number;
  searchQuery?: string;
  orderBy?: string;
  order?: 'ASC' | 'DESC';
};
