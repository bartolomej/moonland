import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CoinsService } from './services/coins.service';
import { CoinAggregationService } from './services/aggregation.service';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('coins')
export class CoinsController {
  constructor(
    private readonly coinsService: CoinsService,
    private readonly aggregationService: CoinAggregationService,
  ) {}

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
    return this.coinsService.findAll({
      order,
      orderBy,
      skip,
      limit,
      searchQuery,
    });
  }

  @Get('stats')
  getStats() {
    return this.coinsService.getStats();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Crypto coin ID.', example: 'DOGE' })
  findOne(@Param('id') id: string) {
    return this.coinsService.findOne(id);
  }

  @Post('aggregate')
  @ApiQuery({
    name: 'l',
    description: 'Limit the number of returned coins',
    example: 5,
  })
  refetch(@Query('l', ParseIntPipe) limit) {
    // TODO: remove in the future, schedule tasks using cron
    return this.aggregationService.fetch(limit);
  }
}
