import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const [shrunk, setShrunk] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { session, profile } = useAuth();

  useEffect(() => {
    function onScroll() {
      setShrunk(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const role = profile?.role || session?.user?.user_metadata?.role || "guest";

  return (
    <header className={`site-header luxury-header ${shrunk ? "is-shrunk" : ""}`}>
      <div className="container luxury-header-shell">

        {/* LEFT - LOGO (RESTORED) */}
        <div className="luxury-header-left">
          <Link to="/" className="luxury-logo-wrap">
            <img src={logo} alt="Playa Escondida" className="logo luxury-logo" />
          </Link>
        </div>

        {/* CENTER - TABS (UNCHANGED) */}
        <div className="luxury-header-center">
          <nav className="nav-links luxury-nav luxury-nav-centered">
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/listings">VACATION RENTALS</NavLink>
            <NavLink to="/our-listings">OUR LISTINGS</NavLink>
            <NavLink to="/login">LOG IN / SIGN UP</NavLink>
            <NavLink to="/about">ABOUT US</NavLink>
            <NavLink to="/contact">CONTACT</NavLink>
          </nav>
        </div>

        {/* RIGHT - ONLY ADD BUTTONS (NO OTHER CHANGES) */}
        <div className="luxury-header-right">
          <div className="header-actions luxury-header-actions">

            {(role === "owner" || role === "admin") && (
              <Link to="/owner-portal" className="admin-access-btn owner-btn">
                OWNER
              </Link>
            )}

            {session && (
              <Link to="/admin" className="admin-access-btn admin-btn">
                ADMIN
              </Link>
            )}

            <a href="tel:+50766164212" className="icon-btn">📞</a>
            <a href="mailto:saul@playa.com" className="icon-btn">✉️</a>

            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>

          </div>
        </div>

      </div>
    </header>
  );
}
