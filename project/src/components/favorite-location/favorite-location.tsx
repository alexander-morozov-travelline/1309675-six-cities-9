import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';

type FavoriteLocationProps = {
  locationName: string;
}
function FavoriteLocation(favoriteLocationProps: FavoriteLocationProps): JSX.Element {
  const {locationName} = favoriteLocationProps;
  return (
    <div className="favorites__locations locations locations--current" data-testid="favorites-locations">
      <div className="locations__item">
        <Link to={AppRoute.Root} className="locations__item-link">
          <span>{locationName}</span>
        </Link>
      </div>
    </div>
  );
}

export default FavoriteLocation;
