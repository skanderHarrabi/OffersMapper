import { Inject, Injectable, Logger } from '@nestjs/common';

import { Offer1Service } from 'src/shared/offer1-api/offer1.service';
import { Offer2Service } from 'src/shared/offer2-api/offer2.service';
import { ValidationService } from 'src/shared/validations/validation.service';

@Injectable()
export class OfferService {
  constructor(
    @Inject(Logger)
    private readonly logger: Logger,
    @Inject(ValidationService)
    private readonly validationService: ValidationService,
    @Inject(Offer2Service)
    private readonly offer2Service: Offer2Service,
    @Inject(Offer1Service)
    private readonly offer1Service: Offer1Service,
  ) {}

  public async fetchAndValidateOffers() {
    try {
      const [payload1, payload2] = await Promise.all([
        this.offer1Service.fetchOffer(),
        this.offer2Service.fetchOffer(),
      ]);

      const entries = [...payload1, ...payload2];
      const validEntries = this.validationService.validateOffers(entries);

      return validEntries;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
