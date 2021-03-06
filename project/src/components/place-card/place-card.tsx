import { Offer } from '../../types/offer';
import {Link} from 'react-router-dom';
import {AppRoute, BookmarkType} from '../../const';
import {getOfferTypeTitle, getStyleWidthByRating} from '../../utils/common';
import BookmarkButton from '../bookmark-button/bookmark-button';

type OfferProps = {
  offer: Offer,
  cardType: string,
  cardPlaceType: string,
  onMouseEnter?: (id: number) => void,
  onMouseLeave?: () => void,
}

function PlaceCard(offerProps: OfferProps) {
  const {offer, cardType, cardPlaceType, onMouseEnter, onMouseLeave } = offerProps;
  const { id, isPremium, previewImage, price, rating, title, type } = offer;

  return (
    <article
      className={`${cardPlaceType} place-card`}
      onMouseEnter={ () => onMouseEnter && onMouseEnter(id)}
      onMouseLeave={onMouseLeave && onMouseLeave}
      data-testid="place-card"
    >
      <div className="place-card__mark" hidden={!isPremium}>
        <span>Premium</span>
      </div>
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" data-testid="place-card-image" />
        </Link>
      </div>
      <div className="place-card__info" data-testid="place-card-info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton offer={offer} width={18} height={19} type={BookmarkType.PlaceCard}/>
        </div>
        <div className="place-card__rating rating" data-testid="place-card-rating">
          <div className="place-card__stars rating__stars">
            <span style={getStyleWidthByRating(rating)} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{getOfferTypeTitle(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
