import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

const Header = ({ isAuth }) => {
  const navigate = useNavigate();
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        // only for mobile
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
          setHideHeader(true); // scroll down -> hide
        } else {
          setHideHeader(false); // scroll up -> show
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={hideHeader ? "hide-header" : ""}>
      <div className="logo" onClick={() => navigate("/")}>
        VidyaSetu
      </div>
      <div className="link">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/about">About</Link>
        {isAuth ? (
          <Link to="/account">Account</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/chatbox">Discuss with your Friends</Link>
        <Link to="/ai">Chat with Ai</Link>
      </div>
    </header>
  );
};

export default Header;
