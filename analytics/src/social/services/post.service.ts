import { Injectable, NotFoundException } from '@nestjs/common';
import { SocialPost } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleTypeormError } from '../../errors';
import { AbstractQueryOptions } from '../../types';
import { defaultRowLimit } from '../../config';

export enum GroupByPeriod {
  SECOND = 6,
  MINUTE = 5,
  HOUR = 4,
  DAY = 3,
  WEEK = 2,
  MONTH = 1,
  YEAR = 0,
}

type TimeSeriesParams = {
  groupByPeriod?: GroupByPeriod;
  startDate?: string;
  endDate?: string;
  searchQuery?: string;
  coin?: string;
};

type TimeSeriesItem = {
  label: any;
  value: any;
};

type PostQueryOptions = AbstractQueryOptions & {
  coin?: string;
  userId?: string;
  username?: string;
};

@Injectable()
export class SocialPostService {
  constructor(
    @InjectRepository(SocialPost)
    private readonly repository: Repository<SocialPost>,
  ) {}

  save(post: SocialPost) {
    return this.repository.save(post).catch(handleTypeormError);
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

  findAll(options: PostQueryOptions) {
    // always limit returned rows to reduce response time
    if (!options.limit) {
      options.limit = defaultRowLimit;
    }
    return this.query(options).getMany();
  }

  query({
    coin,
    limit,
    skip,
    orderBy,
    order,
    searchQuery,
    userId,
    username,
  }: PostQueryOptions) {
    const query = this.repository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'user');

    if (coin) {
      query.where('post.coin = :coin', { coin });
    }

    if (searchQuery) {
      query.andWhere(`post.text RLIKE :regex`, { regex: searchQuery });
    }

    if (userId) {
      query.andWhere(`user.id = :userId`, { userId });
    } else if (username) {
      query.andWhere(`user.username = :username`, { username });
    }

    if (orderBy) {
      query.orderBy(orderBy, order);
    } else {
      query.orderBy('post.createdAt', 'DESC');
    }

    if (skip) {
      query.skip(skip);
    }

    if (limit) {
      query.take(limit);
    }
    return query;
  }

  findOne(id: string) {
    const post = this.repository.findOne(id);
    if (!post) {
      throw new NotFoundException('Social post not found');
    }
    return post;
  }

  async getTimeframeStats({
    groupByPeriod,
    startDate,
    endDate,
    searchQuery,
    coin,
  }: TimeSeriesParams): Promise<TimeSeriesItem[]> {
    // compose a format that enables count grouping by defined period
    // Y=year, M=month, V=week, d=day, H=hour, i=minute, s=second
    const parts = ['%Y', '%m', '%V', '%d', '%H', '%i', '%s'];
    const endIndex = GroupByPeriod[groupByPeriod] || GroupByPeriod.HOUR;
    const format = parts.slice(0, +endIndex + 1).join(' ');

    const query = this.repository
      .createQueryBuilder('p')
      .select('count(*)', 'count')
      .addSelect(`DATE_FORMAT(p.createdAt, '${format}')`, 'format')
      .addSelect('p.createdAt', 'date')
      .innerJoin('p.coin', 'coin');

    if (startDate) {
      query.andWhere(`p.createdAt >= :startDate`, { startDate });
    }
    if (endDate) {
      query.andWhere(`p.createdAt <= :endDate`, { endDate });
    }
    if (coin) {
      query.andWhere(`coin.symbol = :coin`, { coin });
    }
    if (searchQuery) {
      query.andWhere(`p.text RLIKE :regex`, { regex: searchQuery });
    }

    query.groupBy('format');

    const result = await query.getRawMany();
    return result.map((res) => ({
      label: res.date,
      value: parseInt(res.count),
    }));
  }
}
