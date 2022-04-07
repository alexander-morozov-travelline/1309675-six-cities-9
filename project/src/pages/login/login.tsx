import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';
import {useAppDispatch} from '../../hooks/hooks';
import {AppRoute, CitiesList} from '../../const';
import {getRandValFromArray} from '../../utils/common';
import {City} from '../../types/offer';
import {setCity} from '../../store/offers-data/offers-data';
import {Link} from 'react-router-dom';

function Login(): JSX.Element {
  const city = getRandValFromArray(CitiesList) as City;
  const dispatch = useAppDispatch();

  const handleClick = (clickedCity: City) => () => dispatch(setCity(clickedCity));

  return (
    <div className="page page--gray page--login">
      <Header isLoginPage />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" onClick={handleClick(city)} to={AppRoute.Root}>
                <span>{city.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
