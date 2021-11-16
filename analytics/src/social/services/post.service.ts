import { Injectable, NotFoundException } from '@nestjs/common';
import { SocialPost } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleTypeormError } from '../../errors';

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
}
