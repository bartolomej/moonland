import { Controller, Get, Param } from '@nestjs/common';
import { MentionService } from '../services/mention.service';

@Controller('social/mention')
export class MentionController {
  constructor(private readonly socialService: MentionService) {}

  @Get()
  findAll() {
    return this.socialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialService.findOne(id);
  }
}
