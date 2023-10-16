import {
  Offer1ResponseDTO,
  ResponseOfferDTO,
} from '../../shared/offer1-api/dto/offer1.dto';
import { Offer2ResponseDTO } from '../../shared/offer2-api/dto/offer2.dto';
import { OfferDto } from 'src/repo/main/offers/dto/offer.dto';

type OfferType = 'offer1' | 'offer2';

// Mapper for Offer1 API response to match OffersEntity format

function mapOffer1ResponseToEntity(apiResponse: Offer1ResponseDTO): OfferDto[] {
  try {
    const offers: OfferDto[] = apiResponse.response.offers.map(
      (offerDTO: ResponseOfferDTO) => {
        const offer: OfferDto = new OfferDto();

        offer.externalOfferId = offerDTO.offer_id;
        offer.name = offerDTO.offer_name;
        offer.description = offerDTO.offer_desc;
        offer.requirements = offerDTO.call_to_action;
        offer.offerUrlTemplate = offerDTO.offer_url;
        offer.thumbnail = offerDTO.image_url;
        offer.isDesktop = offerDTO.platform === 'desktop' ? 1 : 0;
        offer.isAndroid = offerDTO.device !== 'iphone_ipad' ? 1 : 0;
        offer.isIos = offerDTO.device === 'iphone_ipad' ? 1 : 0;
        offer.providerName = 'offer1';
        offer.slug = offer.calculateSlug();

        return offer;
      },
    );

    return offers;
  } catch (error) {
    console.log(error);
  }
}

// Mapper for Offer2 API response to match OffersEntity format

function mapOffer2ResponseToEntity(apiResponse: Offer2ResponseDTO): OfferDto[] {
  const data = apiResponse.data;
  const offerIds = Object.keys(data);

  return offerIds.map((offerId) => {
    const offerData = data[offerId];
    const offer: OfferDto = new OfferDto();

    offer.name = offerData.Offer.name;
    offer.description = offerData.Offer.description;
    offer.requirements = offerData.Offer.instructions;
    offer.thumbnail = offerData.Offer.icon;
    offer.isDesktop = offerData.OS.web ? 1 : 0;
    offer.isAndroid = offerData.OS.android ? 1 : 0;
    offer.isIos = offerData.OS.ios ? 1 : 0;
    offer.offerUrlTemplate = offerData.Offer.tracking_url;
    offer.providerName = 'offer2';
    offer.externalOfferId = offerData.Offer.campaign_id.toString();
    offer.slug = offer.calculateSlug();

    return offer;
  });
}

// Decorator for converting API response to OfferEntity format during retrieval.

export function MapOfferToEntity(type: OfferType) {
  const offerTypeMappings: {
    [key: string]: (
      result: Offer1ResponseDTO | Offer2ResponseDTO,
    ) => OfferDto[];
  } = {
    offer1: mapOffer1ResponseToEntity,
    offer2: mapOffer2ResponseToEntity,
    // Add more mappings for potential future offer types here
  };

  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const realMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await realMethod.apply(this, args);

      const mapFunction = offerTypeMappings[type] || ((result) => result);
      return mapFunction(result);
    };
  };
}
