import { Controller, Get, Param, Query } from '@nestjs/common';
import { SocialUserService } from '../services/user.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('social/users')
export class SocialUserController {
  constructor(private readonly socialUserService: SocialUserService) {}

  @Get()
  @ApiQuery({
    name: 'query',
    description: 'Search query.',
    example: 'To the moon',
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
  ) {
    return this.socialUserService.findAll({
      searchQuery,
      limit,
      skip,
      order,
      orderBy,
    });
  }

  @Get('stats')
  getStats() {
    return this.socialUserService.getStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialUserService.findOne(id);
  }
}
