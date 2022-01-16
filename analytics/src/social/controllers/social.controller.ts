import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  Post,
  Param,
} from '@nestjs/common';
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
    name: 'query',
    description: 'Search query string.',
    example: 'bitcoin',
  })
  @ApiQuery({
    name: 'limit',
    description: 'Maximum number of results returned from Twitter API',
    example: 2,
  })
  findAlTweets(@Query('limit') query, @Query('limit', ParseIntPipe) limit) {
    return this.twitterService.findAll(query, limit);
  }

  @Post('aggregate')
  @ApiQuery({
    name: 'id',
    description: 'Array of coin ids to fetch.',
    example: 'BTC,ETH',
  })
  aggregate(@Query('id') id = '') {
    return this.aggregationService.fetch(id.split(','));
  }

  @Get('user/:ids')
  getUser(@Param('ids') ids) {
    return this.twitterService.findUsers([ids]);
  }
}
