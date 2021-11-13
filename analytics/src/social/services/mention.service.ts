import { Injectable, NotFoundException } from '@nestjs/common';
import { SocialMention } from '../entities/mention.entity';

@Injectable()
export class MentionService {
  private storage: { [id: string]: SocialMention } = {};

  upsert(mention: SocialMention) {
    this.storage[mention.id] = mention;
    return mention;
  }

  findAll() {
    const ids = Object.keys(this.storage);
    return ids.map((id) => this.storage[id]);
  }

  findOne(id: string) {
    const mention = this.storage[id];
    if (!mention) {
      throw new NotFoundException('Social mention not found');
    }
    return mention;
  }
}
