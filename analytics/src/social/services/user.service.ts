import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialUser } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { handleTypeormError } from '../../errors';
import { defaultRowLimit } from '../../config';
import { AbstractQueryOptions } from '../../types';
import { SocialPost } from '../entities/post.entity';

type UserQueryOptions = AbstractQueryOptions & { countPosts?: boolean };

@Injectable()
export class SocialUserService {
  constructor(
    @InjectRepository(SocialUser)
    private readonly repository: Repository<SocialUser>,
  ) {}

  async save(user: SocialUser) {
    return this.repository.save(user).catch(handleTypeormError);
  }

  async findOne(id: string) {
    return this.repository.findOne(id);
  }

  async getStats() {
    const [count] = await Promise.all([this.count()]);
    return {
      count,
    };
  }

  count() {
    return this.repository.count();
  }

  findAll(options: UserQueryOptions) {
    // always limit returned rows to reduce response time
    if (!options.limit) {
      options.limit = defaultRowLimit;
    }
    return this.query(options).getMany();
  }

  query({
    limit,
    skip,
    orderBy,
    order,
    searchQuery,
    countPosts = true,
  }: UserQueryOptions) {
    const query = this.repository.createQueryBuilder('user');

    if (countPosts) {
      query.loadRelationCountAndMap('user.postsCount', 'user.posts', 'post');
    }

    if (searchQuery) {
      query.andWhere(`user.name RLIKE :regex`, { regex: searchQuery });
      query.orWhere(`user.username RLIKE :regex`, { regex: searchQuery });
      query.orWhere(`user.description RLIKE :regex`, { regex: searchQuery });
    }

    if (orderBy) {
      query.orderBy(orderBy, order);
    }

    if (skip) {
      query.skip(skip);
    }

    if (limit) {
      query.take(limit);
    }

    return query;
  }
}
