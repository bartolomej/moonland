import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { SocialService } from './services/social.service';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { TwitterGatewayService } from './services/twitter.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('social')
export class SocialController {
  constructor(
    private readonly socialService: SocialService,
    private readonly twitterService: TwitterGatewayService,
  ) {}

  @Post()
  create(@Body() createSocialDto: CreateSocialDto) {
    return this.socialService.create(createSocialDto);
  }

  @Get()
  findAll() {
    return this.socialService.findAll();
  }

  @Get('tweet')
  @ApiQuery({
    name: 'q',
    description: 'Search query string.',
    example: 'bitcoin',
  })
  @ApiQuery({
    name: 'l',
    description: 'Maximum number of results returned from Twitter API',
    example: 2,
  })
  findAlTweets(@Query('q') query, @Query('l', ParseIntPipe) limit) {
    return this.twitterService.findAllByQuery(query, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocialDto: UpdateSocialDto) {
    return this.socialService.update(+id, updateSocialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialService.remove(+id);
  }
}
