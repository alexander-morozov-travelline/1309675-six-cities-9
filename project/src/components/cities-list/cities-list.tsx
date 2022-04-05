import { useAppDispatch } from '../../hooks/hooks';
import {City} from '../../types/offer';
import {CitiesList} from '../../const';
import {setCity} from '../../store/offers-data/offers-data';

type CityListProps = {
  city: City
}

function CityList(cityListProps: CityListProps) {
  const { city } = cityListProps;
  const dispatch = useAppDispatch();

  const handleClick = (clickedCity: City) => () => dispatch(setCity(clickedCity));

  return (
    <section className="locations container" data-testid="cities-list">
      <ul className="locations__list tabs__list">
        {CitiesList.map((item) => {
          const className = `locations__item-link tabs__item${item.name === city.name && ' tabs__item--active'}`;
          return (
            <li key={item.name} className="locations__item" onClick={handleClick(item)}>
              <a className={className} href="#locations__item">
                <span>{item.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CityList;
