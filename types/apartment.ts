export interface ApartmentData {
  Id: number;
  title: string;
  Description: string;
  image: string;
  galery: string[];
  loction: {
    region: string;
    district: string;
    area: string;
    nearbyLandmarks: string[];
    distanceToTown: string;
  };
  price: number;
  type: string;
  amenities: string[];
  specifications: {
    bedrooms: number;
    bathrooms: number;
    squareFootage: number;
    furnished: boolean;
    yearBuilt: number;
  };
  utilities: {
    water: boolean;
    electricity: boolean;
    internet: boolean;
    maintenance: string;
  };
  agent: {
    name: string;
    phone: string;
    email: string;
    experience: string;
    languages: string[];
  };
  leaseTerms: {
    minimumStay: string;
    securityDeposit: number;
    petsAllowed: boolean;
    availableFrom: string;
  };
} 