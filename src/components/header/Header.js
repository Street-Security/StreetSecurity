import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../img/logo.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setIsHeaderFixed(true);
    } else {
      setIsHeaderFixed(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHomeClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <header className={`header ${isHeaderFixed ? "fixed" : ""}`}>
      <div className="header-logo">
        <img src={Logo} alt="Logo" className="logo-img" />
        <span className="site-name" onClick={handleHomeClick}>Street Security</span>
      </div>
      <nav className={`header-nav ${isMenuOpen ? "open" : ""}`}>
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul>
          <li>
            <Link to="/" onClick={handleHomeClick}>Home</Link>
          </li>
          <li>
            <a href="#sobre" onClick={() => document.getElementById("sobre").scrollIntoView({ behavior: "smooth" })}>Sobre</a>
          </li>
          <li>
            <a href="#faq" onClick={() => document.getElementById("faq").scrollIntoView({ behavior: "smooth" })}>FAQ</a>
          </li>
          <li>
            <Link to="/problema">Reportar</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
