import { Injectable, NotFoundException } from '@nestjs/common';
import { Coin } from '../entities/coin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoinsService {
  constructor(
    @InjectRepository(Coin)
    private readonly coinRepository: Repository<Coin>,
  ) {}

  async findAll(limit?: number) {
    return this.coinRepository
      .createQueryBuilder()
      .select()
      .take(limit)
      .getMany();
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
