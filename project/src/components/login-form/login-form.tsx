import {useAppDispatch} from '../../hooks/hooks';
import {FormEvent, useRef} from 'react';
import {AuthData} from '../../types/auth-data';
import {loginAction} from '../../store/api-actions';
import {isEmailCorrect, isPasswordCorrect} from '../../utils';

function LoginForm():JSX.Element {
  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (authData: AuthData) => {
    if(isEmailCorrect(authData.login) && isPasswordCorrect(authData.password)) {
      dispatch(loginAction(authData));
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };
  return (
    <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password"
          required
        />
      </div>
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );
}

export default LoginForm;
