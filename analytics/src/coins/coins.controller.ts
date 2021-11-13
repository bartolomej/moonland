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
  findAll() {
    return this.coinsService.findAll();
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
    return this.aggregationService.refetchCoinData(limit);
  }
}
