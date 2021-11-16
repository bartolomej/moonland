import { Test, TestingModule } from '@nestjs/testing';
import { SocialPostService } from './post.service';

describe('SocialService', () => {
  let service: SocialPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialPostService],
    }).compile();

    service = module.get<SocialPostService>(SocialPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
