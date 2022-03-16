import {City, Offers} from '../../types/offer';
import OfferList from '../../components/offer-list/offer-list';
import Header from '../../components/header/header';
import {AuthorizationStatus, DEFAULT_SORT, Sort} from '../../const';
import Map from '../../components/map/map';
import {useState} from 'react';
import {getPointsFromOffers, getSortedOffers} from '../../utils';
import CityList from '../../components/cities-list/cities-list';
import PlacesSorting from '../../components/places-sorting/places-sorting';

type MainPageProps = {
  offers: Offers,
  city: City,
}

function MainPage(mainPageProps: MainPageProps): JSX.Element {
  const {offers, city} = mainPageProps;
  const points = getPointsFromOffers(offers);
  const cityOffers = offers.filter((item) => item.city.name === city.name);

  const [activeOffer, setActiveOffer] = useState<null|number>(null);
  const [sortType, setSortType] = useState<Sort>(DEFAULT_SORT);

  const getSortedCityOffers = () => getSortedOffers(sortType, cityOffers);

  return (
    <div className="page page--gray page--main">
      <Header authorizationStatus={AuthorizationStatus.Auth}/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList city={city}/>
        </div>
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
      </main>
    </div>
  );
}

export default MainPage;
