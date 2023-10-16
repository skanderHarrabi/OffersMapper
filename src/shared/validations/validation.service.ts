import { Inject, Injectable, Logger } from '@nestjs/common';
import { validateSync } from 'class-validator';

import { OfferDto } from 'src/repo/main/offers/dto/offer.dto';

@Injectable()
export class ValidationService {
  constructor(
    @Inject(Logger)
    private readonly logger: Logger,
  ) {}

  /**
   * Validate Offers before pushing.
   */
  public validateOffers(offers: OfferDto[]) {
    const validOffers = offers.filter((offer) => {
      const errors = validateSync(offer);

      if (errors.length > 0) {
        this.logger.warn(`validation error for ${JSON.stringify(offer)}.`);
      }

      return errors.length === 0;
    });

    return validOffers;
  }
}
