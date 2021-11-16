import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialUser } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { handleTypeormError } from '../../errors';

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

  async findAll() {
    return this.repository.find();
  }
}
