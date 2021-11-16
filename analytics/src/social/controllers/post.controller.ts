import { Controller, Get, Param } from '@nestjs/common';
import { SocialPostService } from '../services/post.service';

@Controller('social/posts')
export class SocialPostController {
  constructor(private readonly socialPostService: SocialPostService) {}

  @Get()
  findAll() {
    return this.socialPostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialPostService.findOne(id);
  }
}
