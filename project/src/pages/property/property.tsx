import Header from '../../components/header/header';
import ReviewForm from '../../components/review-form/review-form';
import {useParams} from 'react-router-dom';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import {
  getOfferTypeTitle,
  getPointFromOffer,
  getPointsFromOffers,
  getStyleWidthByRating,
  sortCommentDateDown
} from '../../utils/common';
import NearPlaces from '../../components/near-places/near-places';
import {useEffect} from 'react';
import {fetchOfferDataAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import NotFound from '../not-found/not-found';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import {AuthorizationStatus, BookmarkType, MAX_COMMENT_COUNT} from '../../const';
import {loadNearOffers, setItemOffer} from '../../store/offers-data/offers-data';
import {loadOfferComments} from '../../store/comments-data/comments-data';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import {Comments} from '../../types/offer';

function Property() {
  const dispatch = useAppDispatch();
  const {id=null} = useParams<{id: string}>();

  const {authorizationStatus} = useAppSelector(({USER}) => USER);
  const {itemOffer: offer, nearOffers} = useAppSelector(({OFFERS}) => OFFERS);
  const {comments} = useAppSelector(({COMMENTS}) => COMMENTS);

  const formattedComments: Comments = comments
    ? [...comments].sort(sortCommentDateDown).slice(0, MAX_COMMENT_COUNT)
    : [];

  useEffect( () => {
    if(id) {
      dispatch(fetchOfferDataAction(id));
    }
    return () => {
      dispatch(setItemOffer(undefined));
      dispatch(loadOfferComments([]));
      dispatch(loadNearOffers([]));
    };
  }, [id, dispatch]);

  if(offer === undefined){
    return <LoadingScreen />;
  }

  if(offer === null){
    return <NotFound />;
  }

  const points = [...getPointsFromOffers(nearOffers), getPointFromOffer(offer)];

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                offer.images.map((image, index) =>
                  (
                    <div key={index.toString()} className="property__image-wrapper">
                      <img className="property__image" src={image} alt="Place"/>
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
                <BookmarkButton offer={offer} width={31} height={33} type={BookmarkType.Property} />
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={getStyleWidthByRating(offer.rating)}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {getOfferTypeTitle(offer.type)}
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
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74"
                      height="74" alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{offer.host.name}</span>
                  {offer.host.isPro && <span className="property__user-status">Pro</span> }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{formattedComments.length}</span></h2>
                <ReviewsList comments={formattedComments} />
                {
                  authorizationStatus === AuthorizationStatus.Auth &&
                  <ReviewForm />
                }
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map city={offer.city} points={points} selectedPointId={offer.id} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearPlaces offerList={nearOffers} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Property;
