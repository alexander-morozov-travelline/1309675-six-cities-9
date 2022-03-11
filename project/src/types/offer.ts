export type Location = {
  latitude: number,
  longitude: number,
  zoom: number,
}

export type City = {
  name: string,
  location: Location,
}

export type Host = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
}

export type Offer = {
  id: number,
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: Host,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: Location,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
}

export type OffersGroupByCity = {city: string, offers: Offer[]}[];

export type Point = {
  title: string;
  latitude: number,
  longitude: number,
};

export type Points = Point[];

