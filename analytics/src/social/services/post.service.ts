import { Injectable, NotFoundException } from '@nestjs/common';
import { SocialPost } from '../entities/post.entity';

@Injectable()
export class PostService {
  private storage: { [id: string]: SocialPost } = {};

  save(mention: SocialPost) {
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
