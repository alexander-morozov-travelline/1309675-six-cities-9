import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';
import {useAppSelector} from '../../hooks/hooks';
import {State} from '../../types/state';

function Login(): JSX.Element {
  const {city} = useAppSelector((state: State) => state);
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
              <a className="locations__item-link" href="#">
                <span>{city.name}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
