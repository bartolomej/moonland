import { Injectable, NotFoundException } from '@nestjs/common';
import { Coin } from '../entities/coin.entity';

@Injectable()
export class CoinsService {
  // TODO: replace mock in-memory storage with persistent db
  private storage: { [id: string]: Coin } = {};

  async findAll() {
    const ids = Object.keys(this.storage);
    return ids.map((id) => this.storage[id]);
  }

  async findOne(id: string) {
    const coin = this.storage[id];
    if (!coin) {
      throw new NotFoundException('Coin not found');
    }
    return coin;
  }

  async upsert(coin: Coin) {
    this.storage[coin.id] = coin;
    return coin;
  }
}
