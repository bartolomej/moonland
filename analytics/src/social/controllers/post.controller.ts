import { Controller, Get, Param, Query } from '@nestjs/common';
import { SocialPostService } from '../services/post.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('social/posts')
export class SocialPostController {
  constructor(private readonly socialPostService: SocialPostService) {}

  @Get()
  @ApiQuery({
    name: 'query',
    description: 'Search query.',
    example: 'To the moon',
    required: false,
  })
  @ApiQuery({
    name: 'coin',
    description: 'Coin symbol. Empty value will take into account all coins.',
    example: 'BTC',
    required: false,
  })
  @ApiQuery({
    name: 'userId',
    description: 'Social user id.',
    example: '1209494405985402880',
    required: false,
  })
  @ApiQuery({
    name: 'username',
    description: 'Social username',
    example: 'elonmusk',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limit total results.',
    example: 10,
    required: false,
  })
  @ApiQuery({
    name: 'skip',
    description: 'Skip results.',
    example: 0,
    required: false,
  })
  @ApiQuery({
    name: 'order',
    description: 'Ordering order (ASC, DESC)',
    example: 'ASC',
    required: false,
  })
  @ApiQuery({
    name: 'orderBy',
    description: 'Order by field',
    example: 10,
    required: false,
  })
  findAll(
    @Query('query') searchQuery,
    @Query('limit') limit,
    @Query('skip') skip,
    @Query('order') order,
    @Query('orderBy') orderBy,
    @Query('coin') coin,
    @Query('userId') userId,
    @Query('username') username,
  ) {
    return this.socialPostService.findAll({
      searchQuery,
      limit,
      skip,
      order,
      orderBy,
      coin,
      userId,
      username,
    });
  }

  @Get('stats')
  getStats() {
    return this.socialPostService.getStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialPostService.findOne(id);
  }
}
