import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/hooks';
import {setCity} from '../../store/offers-data/offers-data';
import {getCityByName} from '../../utils/common';

type FavoriteLocationProps = {
  locationName: string;
}
function FavoriteLocation(favoriteLocationProps: FavoriteLocationProps): JSX.Element {
  const {locationName} = favoriteLocationProps;
  const dispatch = useAppDispatch();
  const handleClick = (clickedCity: string) => () => dispatch(setCity(getCityByName(clickedCity)));
  return (
    <div className="favorites__locations locations locations--current" data-testid="favorites-locations">
      <div className="locations__item">
        <Link to={AppRoute.Root} className="locations__item-link" onClick={handleClick(locationName)}>
          <span>{locationName}</span>
        </Link>
      </div>
    </div>
  );
}

export default FavoriteLocation;
