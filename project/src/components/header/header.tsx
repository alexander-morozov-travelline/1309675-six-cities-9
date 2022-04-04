import {AppRoute, AuthorizationStatus} from '../../const';
import {Link} from 'react-router-dom';
import SignOut from '../sign-out/sign-out';
import {useAppSelector} from '../../hooks/hooks';

type HeaderProps = {
  isLoginPage?: boolean
};

function Header({isLoginPage = false}: HeaderProps): JSX.Element {
  const {authorizationStatus} = useAppSelector(({USER}) => USER);
  const {user} = useAppSelector(({USER}) => USER);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Root}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          {
            !isLoginPage
              ?
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        {
                          authorizationStatus === AuthorizationStatus.Auth && user &&
                          <img className="header__avatar user__avatar" src={user.avatarUrl} width="20" height="20" alt="Header avatar" />
                        }
                      </div>
                      {
                        authorizationStatus === AuthorizationStatus.Auth && user
                          ? <span className="header__user-name user__name">{user.email}</span>
                          : <span className="header__login">Sign in</span>
                      }
                    </Link>
                  </li>
                  {
                    authorizationStatus === AuthorizationStatus.Auth &&
                    <SignOut />
                  }
                </ul>
              </nav>
              : null
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
