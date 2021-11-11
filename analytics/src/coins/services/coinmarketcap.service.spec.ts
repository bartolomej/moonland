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

  it('should return a 200 OK response', async () => {
    const { data, status } = await service.fetchCryptocurrencyInfo([1, 2]);
    expect(status).toBe(200);
    expect(Object.keys(data.data).length).toBe(2);
  });
});
