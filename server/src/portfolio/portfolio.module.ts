import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { PortfolioItem, PortfolioItemSchema } from './schemas/portfolio-item.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PortfolioItem.name, schema: PortfolioItemSchema }]),
    AuthModule
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService]
})
export class PortfolioModule {}
