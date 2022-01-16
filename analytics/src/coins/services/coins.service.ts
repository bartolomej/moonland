import { Injectable, NotFoundException } from '@nestjs/common';
import { Coin } from '../entities/coin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { defaultRowLimit } from '../../config';
import { AbstractQueryOptions } from '../../types';

type CoinQueryOptions = AbstractQueryOptions;

@Injectable()
export class CoinsService {
  constructor(
    @InjectRepository(Coin)
    private readonly coinRepository: Repository<Coin>,
  ) {}

  async getStats() {
    const [count] = await Promise.all([this.count()]);
    return {
      count,
    };
  }

  async findAll(options: CoinQueryOptions) {
    // always limit returned rows to reduce response time
    if (!options.limit) {
      options.limit = defaultRowLimit;
    }
    return this.query(options).getMany();
  }

  query({
    limit,
    skip,
    searchQuery,
    orderBy = 'cmcRank',
    order = 'ASC',
  }: CoinQueryOptions) {
    const query = this.coinRepository.createQueryBuilder('coin').select();

    if (searchQuery) {
      query.andWhere(`coin.name RLIKE :regex`, { regex: searchQuery });
      query.orWhere(`coin.symbol RLIKE :regex`, { regex: searchQuery });
      query.orWhere(`coin.description RLIKE :regex`, { regex: searchQuery });
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

  async count() {
    return this.coinRepository.count();
  }

  async findOne(id: string) {
    const coin = this.coinRepository.findOne(id);
    if (!coin) {
      throw new NotFoundException('Coin not found');
    }
    return coin;
  }

  async upsert(coin: Coin) {
    return this.coinRepository.save(coin);
  }
}
