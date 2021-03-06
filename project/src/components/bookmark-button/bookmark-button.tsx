import {MouseEvent} from 'react';
import {AppRoute, AuthorizationStatus, FavoriteStatus} from '../../const';
import {Offer} from '../../types/offer';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {redirectToRoute} from '../../store/action';
import {setFavoriteAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

type BookmarkButtonProperty = {
  offer: Offer,
  width: number,
  height: number,
  type: string,
}

function BookmarkButton(bookmarkButtonProperty: BookmarkButtonProperty):JSX.Element {
  const {offer, width, height, type} = bookmarkButtonProperty;
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthorize = authorizationStatus === AuthorizationStatus.Auth;
  const active = isAuthorize && offer.isFavorite ? ` ${type}__bookmark-button--active` : '';

  const handleFavoriteClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if(isAuthorize) {
      const favoriteStatus = offer.isFavorite ? FavoriteStatus.NotFavorite : FavoriteStatus.Favorite;
      dispatch(setFavoriteAction({hotelId: offer.id, status: favoriteStatus}));
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  return (
    <button className={`${type}__bookmark-button${active} button`} type="button" onClick={handleFavoriteClick}>
      <svg className={`${type}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
