import { Controller, Get, Param } from '@nestjs/common';
import { SocialUserService } from '../services/user.service';

@Controller('social/users')
export class SocialUserController {
  constructor(private readonly socialUserService: SocialUserService) {}

  @Get()
  findAll() {
    return this.socialUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialUserService.findOne(id);
  }
}
