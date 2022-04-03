import PlacesSorting from '../places-sorting/places-sorting';
import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import {getPointsFromOffers, getSortedOffers} from '../../utils/common';
import {useState} from 'react';
import {DEFAULT_SORT, Sort} from '../../const';
import {City, Offers} from '../../types/offer';

type MainContentProps = {
  offers: Offers,
  city: City,
}
function MainContent(mainContentProps: MainContentProps): JSX.Element {
  const {offers, city} = mainContentProps;

  const points = getPointsFromOffers(offers);
  const cityOffers = offers.filter((item) => item.city.name === city.name);

  const [activeOffer, setActiveOffer] = useState<null|number>(null);
  const [sortType, setSortType] = useState<Sort>(DEFAULT_SORT);

  const getSortedCityOffers = () => getSortedOffers(sortType, cityOffers);
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{cityOffers.length} places to stay in {city.name}</b>
          <PlacesSorting sortType={sortType} setSortType={setSortType}></PlacesSorting>
          <div className="cities__places-list places__list tabs__content">
            <OfferList offerList={getSortedCityOffers()} setActiveOffer={setActiveOffer} />
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map city={city} points={points} selectedPointId={activeOffer} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
