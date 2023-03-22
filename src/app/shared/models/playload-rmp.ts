import { Brand } from './brand';

export class PlayloadRmp {
  totalVolume?: number;
  requests?: Campagne[];
}

export class Campagne {
  requestId?: number;
  advice?: boolean;
  campaignName?: string;
  campaignDescription?: string;
  decisionDeadline?: string;
  decisionDescription?: string;
  key?: string;
  numberOfAssets?: number;
  createdDate?: string;
  updatedDate?: string;
  submittedDate?: string;
  validatedDate?: string;
  affiliate?: {
    affiliateId?: number;
    name?: string;
  };
  brand?: Brand;
  requestStatus?: {
    requestStatusId?: number;
    name?: string;
    value?: string;
    step?: number;
  };
  createdBy?: {
    userInfoId?: number;
    name?: string;
    email?: string;
  };
  updatedBy?: {
    userInfoId?: number;
    name?: string;
    email?: string;
  };
  submittedBy?: string;
  validatedBy?: string;
  countries?: Country[];
  media?: Media[];
}

export class Country {
  countryId?: number;
  name?: string;
  value?: string;
}

export class Media {
  mediaId?: number;
  name?: string;
  value?: string;
}
