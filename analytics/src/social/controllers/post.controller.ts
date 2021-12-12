import { Controller, Get, Param, Query } from '@nestjs/common';
import { SocialPostService } from '../services/post.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('social/posts')
export class SocialPostController {
  constructor(private readonly socialPostService: SocialPostService) {}

  @Get()
  @ApiQuery({
    name: 'coin',
    description: 'Coin symbol. Empty value will take into account all coins.',
    example: 'BTC',
    required: false,
  })
  @ApiQuery({
    name: 'l',
    description: 'Limit total results.',
    example: 10,
    required: false,
  })
  findAll(@Query('coin') coin, @Query('l') limit) {
    return this.socialPostService.findAll(coin, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialPostService.findOne(id);
  }
}
