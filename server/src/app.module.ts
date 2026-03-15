import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { LeadsModule } from './leads/leads.module';
import { AiModule } from './ai/ai.module';
import { ResourcesModule } from './resources/resources.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([
      { ttl: 60000, limit: 30 }, // 30 requests per minute (global default)
    ]),
    AuthModule,
    BlogModule,
    PortfolioModule,
    LeadsModule,
    AiModule,
    ResourcesModule,
    NewsletterModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: ThrottlerGuard }, // apply globally
  ],
})
export class AppModule {}
