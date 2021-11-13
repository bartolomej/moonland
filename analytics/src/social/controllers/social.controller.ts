import { Controller, Get, Query, ParseIntPipe, Post } from '@nestjs/common';
import { TwitterGatewayService } from '../services/twitter.service';
import { ApiQuery } from '@nestjs/swagger';
import { SocialAggregationService } from '../services/aggregation.service';

@Controller('social')
export class SocialController {
  constructor(
    private readonly twitterService: TwitterGatewayService,
    private readonly aggregationService: SocialAggregationService,
  ) {}

  @Get('tweet')
  @ApiQuery({
    name: 'q',
    description: 'Search query string.',
    example: 'bitcoin',
  })
  @ApiQuery({
    name: 'l',
    description: 'Maximum number of results returned from Twitter API',
    example: 2,
  })
  findAlTweets(@Query('q') query, @Query('l', ParseIntPipe) limit) {
    return this.twitterService.findAllByQuery(query, limit);
  }

  @Post('aggregate')
  aggregate() {
    return this.aggregationService.fetch();
  }
}
