import { Test, TestingModule } from '@nestjs/testing';
import { MentionService } from './mention.service';

describe('SocialService', () => {
  let service: MentionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MentionService],
    }).compile();

    service = module.get<MentionService>(MentionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
