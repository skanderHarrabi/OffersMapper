import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { OfferService } from './offers.service';

@Controller('offer')
export class OfferController {
  constructor(private readonly OfferService: OfferService) {}

  @Get('')
  async getOffers(@Req() req: Request, @Res() res: Response) {
    try {
      const offers = await this.OfferService.fetchAndValidateOffers();
      return res.status(HttpStatus.OK).json(offers);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error, message: 'Internal Server Error' });
    }
  }
}
