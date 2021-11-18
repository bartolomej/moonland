import { Injectable, NotFoundException } from '@nestjs/common';
import { SocialPost } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleTypeormError } from '../../errors';

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
  coinSymbol?: string;
};

type TimeSeriesItem = {
  label: any;
  value: any;
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

  findAll() {
    return this.repository.find();
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
    coinSymbol,
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
      .addSelect('p.createdAt', 'date');

    if (startDate) {
      query.andWhere(`p.createdAt >= :startDate`, { startDate });
    }
    if (endDate) {
      query.andWhere(`p.createdAt <= :endDate`, { endDate });
    }
    if (coinSymbol) {
      query.andWhere(`p.text RLIKE :regex`, { regex: coinSymbol });
    }

    query.groupBy('format');

    const result = await query.getRawMany();
    return result.map((res) => ({
      label: res.date,
      value: parseInt(res.count),
    }));
  }
}
