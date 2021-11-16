import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from '../services/post.service';

@Controller('social/post')
export class PostController {
  constructor(private readonly socialPostService: PostService) {}

  @Get()
  findAll() {
    return this.socialPostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialPostService.findOne(id);
  }
}
