type FavoriteLocationProps = {
  locationName: string;
}
function FavoriteLocation(favoriteLocationProps: FavoriteLocationProps): JSX.Element {
  const {locationName} = favoriteLocationProps;
  return (
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link" href="/">
          <span>{locationName}</span>
        </a>
      </div>
    </div>
  );
}

export default FavoriteLocation;
