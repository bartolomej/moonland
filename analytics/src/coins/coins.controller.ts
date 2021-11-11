import { Controller, Get, Param, Post } from '@nestjs/common';
import { CoinsService } from './services/coins.service';
import { CoinAggregationService } from './services/aggregation.service';

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
  findOne(@Param('id') id: string) {
    return this.coinsService.findOne(id);
  }

  @Post()
  refetch() {
    // TODO: remove in the future, schedule tasks using cron
    return this.aggregationService.refetchCoinData();
  }
}
