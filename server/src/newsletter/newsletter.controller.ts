import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { SubscribeDto } from './dto/subscribe.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  // Public — subscribe
  @Post('subscribe')
  subscribe(@Body() subscribeDto: SubscribeDto) {
    return this.newsletterService.subscribe(subscribeDto);
  }

  // Admin — list all subscribers
  @UseGuards(JwtAuthGuard)
  @Get('subscribers')
  findAll() {
    return this.newsletterService.findAll();
  }

  // Admin — remove a subscriber
  @UseGuards(JwtAuthGuard)
  @Delete('subscribers/:id')
  remove(@Param('id') id: string) {
    return this.newsletterService.remove(id);
  }
}
