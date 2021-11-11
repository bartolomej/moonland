import { Test, TestingModule } from '@nestjs/testing';
import { CoinmarketcapGatewayService } from './coinmarketcap.service';

describe('CoinsService', () => {
  let service: CoinmarketcapGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoinmarketcapGatewayService],
    }).compile();

    service = module.get<CoinmarketcapGatewayService>(
      CoinmarketcapGatewayService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
