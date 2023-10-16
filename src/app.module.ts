import { Module } from '@nestjs/common';
import { OffersEntityModule } from './repo/main/offers/offers.module';

@Module({
  imports: [OffersEntityModule],
})
export class AppModule {}
