import { Test, TestingModule } from '@nestjs/testing';
import { CoinsController } from './coins.controller';
import { CoinsService } from './services/coins.service';

describe('CoinsController', () => {
  let controller: CoinsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoinsController],
      providers: [CoinsService],
    }).compile();

    controller = module.get<CoinsController>(CoinsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
