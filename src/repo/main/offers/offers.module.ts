import { Module, Logger } from '@nestjs/common';
import { OfferService } from './offers.service';
import { Offer1Module } from 'src/shared/offer1-api/offer1.module';
import { Offer2Module } from 'src/shared/offer2-api/offer2.module';
import { ValidationModule } from 'src/shared/validations/validation.module';
import { ConfigModule } from '@nestjs/config';
import { OfferController } from './offers.controller';

@Module({
  imports: [
    Offer1Module,
    Offer2Module,
    OffersEntityModule,
    ValidationModule,
    ConfigModule,
  ],
  controllers: [OfferController],
  providers: [OfferService, Logger],
  exports: [OfferService],
})
export class OffersEntityModule {}
