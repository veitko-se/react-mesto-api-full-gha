import headerLogo from '../images/header-logo.svg';
import {Link, Route, Routes} from 'react-router-dom';

function Header({login, onSignOut}) {

  return (
    <header className="header">
      <img src={headerLogo} alt="Место" className="header__logo"/>
      <Routes>
        <Route path="/sign-up" element={<Link to="/sign-in" className="header__nav-link">Войти</Link>} />
        <Route path="/sign-in" element={<Link to="/sign-up" className="header__nav-link">Регистрация</Link>} />
        <Route path="/" element={
          <p className="header__nav-block">
            <span className="header__login">{login}</span>
            <button onClick={onSignOut} className="header__signout-btn">Выйти</button>
          </p>
        } />
      </Routes>
    </header>
  );
}

export default Header;
