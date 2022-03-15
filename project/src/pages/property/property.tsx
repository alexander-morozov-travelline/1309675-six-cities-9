import Header from '../../components/header/header';
import {AuthorizationStatus} from '../../const';
import ReviewForm from '../../components/review-form/review-form';
import {useParams} from 'react-router-dom';
import {Offers, Offer} from '../../types/offer';
import ReviewsList from '../../components/reviews-list/reviews-list';
import {comments} from '../../mocks/comments';
import Map from '../../components/map/map';
import {getPointsFromOffers} from '../../utils';
import NearPlaces from '../../components/near-places/near-places';
import {useState} from 'react';

type PropertyProps = {
  offers: Offers,
}

const getOffer = (offers: Offers, id: number): Offer => {
  const index = offers.findIndex((offer) => offer.id === id);
  if(index === -1) {
    throw new Error('Can\'t find offer');
  }
  return offers[index];
};


function Property(propertyProps: PropertyProps) {
  const {offers} = propertyProps;
  const {id} = useParams<{id: string}>();
  const offer = getOffer(offers, Number(id));
  const city = offer.city;
  const points = getPointsFromOffers(offers);
  const [activeOffer, setActiveOffer] = useState<null|number>(null);

  return (
    <div className="page">
      <Header authorizationStatus={AuthorizationStatus.Auth}/>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                offer.images.map((image, index) =>
                  (
                    <div key={index.toString()} className="property__image-wrapper">
                      <img className="property__image" src={image} alt="Place image"/>
                    </div>
                  ),
                )
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                offer.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">{offer.title}</h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: '80%'}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">4.8</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    offer.goods.map((item, number) => (
                      <li className="property__inside-item" key={number.toString()}>
                        {item}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width="74"
                      height="74" alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">Angelina</span>
                  <span className="property__user-status">Pro</span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The
                    building is green and from 18th century.
                  </p>
                  <p className="property__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where
                    the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                <ReviewsList comments={comments} />
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map city={city} points={points} selectedPointId={activeOffer} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearPlaces offerList={offers} setActiveOffer={setActiveOffer}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Property;
