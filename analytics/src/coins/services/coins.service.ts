import { Injectable, NotFoundException } from '@nestjs/common';
import { Coin } from '../entities/coin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

type FindAllOptions = {
  limit?: number;
  skip?: number;
  searchQuery?: string;
  orderBy?: string;
  order?: 'ASC' | 'DESC';
};

@Injectable()
export class CoinsService {
  constructor(
    @InjectRepository(Coin)
    private readonly coinRepository: Repository<Coin>,
  ) {}

  async findAll({ limit, skip, searchQuery, orderBy, order }: FindAllOptions) {
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

    return query.getMany();
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
