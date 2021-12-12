import { Controller, Get, Query } from '@nestjs/common';
import { GroupByPeriod, SocialPostService } from '../services/post.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('social/stats')
export class StatsController {
  constructor(private readonly socialPostService: SocialPostService) {}

  @Get()
  @ApiQuery({
    name: 'start',
    description: 'Start date',
    example: '2020-11-18 17:28:45',
    required: false,
  })
  @ApiQuery({
    name: 'end',
    description: 'End date',
    example: '2022-11-10 20:28:45',
    required: false,
  })
  @ApiQuery({
    name: 'period',
    description: 'Calculation time period',
    example: 5,
    enum: GroupByPeriod,
  })
  @ApiQuery({
    name: 'coin',
    description: 'Coin symbol. Empty value will take into account all coins.',
    example: 'BTC',
    required: false,
  })
  @ApiQuery({
    name: 'q',
    description: 'Search query. Additional filtration by text content.',
    example: 'To the moon',
    required: false,
  })
  getTimeframeStats(
    @Query('start') startDate,
    @Query('end') endDate,
    @Query('period') groupByPeriod,
    @Query('coin') coin,
    @Query('q') searchQuery,
  ) {
    return this.socialPostService.getTimeframeStats({
      startDate,
      endDate,
      groupByPeriod,
      searchQuery,
      coin,
    });
  }
}
