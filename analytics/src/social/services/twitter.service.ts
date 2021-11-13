import { Injectable } from '@nestjs/common';
import { TwitterClient } from 'twitter-api-client';
import { twitter } from '../../config';

@Injectable()
export class TwitterGatewayService {
  private client: TwitterClient;

  constructor() {
    this.client = new TwitterClient(twitter);
  }

  async findAllByQuery(query: string, limit = 15) {
    return this.client.tweets.search({
      q: query,
      count: limit,
    });
  }
}
