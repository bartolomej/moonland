import { Controller, Get, Param, Post } from '@nestjs/common';
import { CoinsService } from './services/coins.service';
import { CoinAggregationService } from './services/aggregation.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('coins')
export class CoinsController {
  constructor(
    private readonly coinsService: CoinsService,
    private readonly aggregationService: CoinAggregationService,
  ) {}

  @Get()
  findAll() {
    return this.coinsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Crypto coin ID.', example: 'DOGE' })
  findOne(@Param('id') id: string) {
    return this.coinsService.findOne(id);
  }

  @Post()
  refetch() {
    // TODO: remove in the future, schedule tasks using cron
    return this.aggregationService.refetchCoinData();
  }
}
