import React, {MouseEvent} from 'react';
import {AppRoute, AuthorizationStatus, FavoriteStatus} from '../../const';
import {Offer} from '../../types/offer';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {redirectToRoute} from '../../store/action';
import {setFavoriteAction} from '../../store/api-actions';

type BookmarkButtonProperty = {
  offer: Offer,
  width: number,
  height: number,
  type: string,
}

function BookmarkButton(bookmarkButtonProperty: BookmarkButtonProperty):JSX.Element {
  const {offer, width, height, type} = bookmarkButtonProperty;
  const dispatch = useAppDispatch();
  const {authorizationStatus} = useAppSelector(({USER}) => USER);

  const active = offer.isFavorite ?  ` ${type}__bookmark-button--active` : '';

  const handleFavoriteClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if(authorizationStatus === AuthorizationStatus.Auth) {
      const favoriteStatus = offer.isFavorite ? FavoriteStatus.NOT_FAVORITE : FavoriteStatus.FAVORITE;
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
