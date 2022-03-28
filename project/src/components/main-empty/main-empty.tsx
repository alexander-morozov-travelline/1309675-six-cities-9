import {City} from '../../types/offer';

type MainEmptyProps = {
  city: City,
}
function MainEmpty(mainEmptyProps: MainEmptyProps): JSX.Element {
  const {city} = mainEmptyProps;
  return (
    <div className="cities">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property available at the moment in {city.name}</p>
          </div>
        </section>
        <div className="cities__right-section" />
      </div>
    </div>
  );
}

export default MainEmpty;