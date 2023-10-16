interface VerticalDTO {
  vertical_id: string;
  vertical_name: string;
}

export interface ResponseOfferDTO {
  offer_id: string;
  offer_name: string;
  offer_desc: string;
  call_to_action: string;
  disclaimer: string;
  offer_url: string;
  offer_url_easy: string;
  payout: number;
  payout_type: string;
  amount: number;
  image_url: string;
  image_url_220x124: string;
  countries: string[];
  platform: string;
  device: string;
  category: { [key: string]: string };
  last_modified: number;
  preview_url: string;
  package_id: string;
  verticals: VerticalDTO[];
}

export interface Offer1ResponseDTO {
  query: {
    pubid: string;
    appid: number;
    country: string;
    platform: string;
  };
  response: {
    currency_name: string;
    offers_count: number;
    offers: ResponseOfferDTO[];
  };
}
