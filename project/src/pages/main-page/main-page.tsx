import {City, Offers} from '../../types/offer';
import OfferList from '../../components/offer-list/offer-list';
import Header from '../../components/header/header';
import {AuthorizationStatus} from '../../const';
import Map from '../../components/map/map';
import {useState} from 'react';
import {getPointsFromOffers} from '../../utils';
import CityList from '../../components/cities-list/cities-list';

type MainPageProps = {
  offers: Offers,
  city: City,
}

function MainPage(mainPageProps: MainPageProps): JSX.Element {
  const {offers, city} = mainPageProps;
  const points = getPointsFromOffers(offers);
  const cityOffers = offers.filter((item) => item.city.name === city.name);

  const [activeOffer, setActiveOffer] = useState<null|number>(null);

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
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <OfferList offerList={cityOffers} setActiveOffer={setActiveOffer} />
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
