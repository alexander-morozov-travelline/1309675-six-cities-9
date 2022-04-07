import {Offer} from '../../types/offer';
import {Link} from 'react-router-dom';
import {AppRoute, BookmarkType} from '../../const';
import BookmarkButton from '../bookmark-button/bookmark-button';

type FavoriteCardProps = {
  offer: Offer,
}

function FavoriteCard(favoriteCardProps: FavoriteCardProps): JSX.Element {
  const {offer} = favoriteCardProps;
  const { isPremium, previewImage, price, rating, title, type } = offer;

  return (
    <article className="favorites__card place-card" data-testid="place-card">
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={AppRoute.Root}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place" data-testid="place-card-image"/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info" data-testid="place-card-info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton offer={offer} width={18} height={19} type={BookmarkType.PlaceCard}/>
        </div>
        <div className="place-card__rating rating" data-testid="place-card-rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 10}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Root}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div >
    </article>
  );
}

export default FavoriteCard;
