import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { SocialPostService } from '../services/post.service';

@Controller('social/stats')
export class StatsController {
  constructor(private readonly socialPostService: SocialPostService) {}

  @Get()
  getTimeframeStats(
    @Query('start') startDate,
    @Query('end') endDate,
    @Query('period', ParseIntPipe) groupByPeriod,
  ) {
    return this.socialPostService.getTimeframeStats({
      startDate,
      endDate,
      groupByPeriod,
    });
  }
}
