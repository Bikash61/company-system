import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';
import { SubscribeDto } from './dto/subscribe.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectModel(Subscriber.name)
    private subscriberModel: Model<SubscriberDocument>,
    private readonly mailService: MailService,
  ) {}

  async subscribe(subscribeDto: SubscribeDto): Promise<{ message: string }> {
    const existing = await this.subscriberModel
      .findOne({ email: subscribeDto.email })
      .exec();

    if (existing) {
      throw new ConflictException('This email is already subscribed.');
    }

    await this.subscriberModel.create(subscribeDto);
    // Send welcome email
    this.mailService.sendNewsletterWelcome(subscribeDto.email);
    return { message: 'Successfully subscribed!' };
  }

  async findAll(): Promise<Subscriber[]> {
    return this.subscriberModel.find().sort({ createdAt: -1 }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.subscriberModel.findByIdAndDelete(id).exec();
  }
}
