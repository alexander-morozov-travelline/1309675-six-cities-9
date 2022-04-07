import Header from '../../components/header/header';
import CityList from '../../components/cities-list/cities-list';
import MainContent from '../../components/main-content/main-content';
import {useAppSelector} from '../../hooks/hooks';
import MainEmpty from '../../components/main-empty/main-empty';
import {getCity, getOffers} from '../../store/offers-data/selectors';

function MainPage(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index" data-testid="main">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList city={city}/>
        </div>
        { offers.length ? <MainContent offers={offers} city={city} /> : <MainEmpty city={city} />}
      </main>
    </div>
  );
}

export default MainPage;
