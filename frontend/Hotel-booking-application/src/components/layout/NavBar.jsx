import { useState } from "react";

import { NavLink, Link } from "react-router-dom";
import Logout from "../auth/Logout";

const NavBar = () => {
  const [showAccount, setShowAccount] = useState(false);
  const isLoggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm sticky-top px-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold">
          <span className="hotel-color">Yassin Palace</span> Hotel
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/browse-all-rooms">
                Explore Rooms
              </NavLink>
            </li>

            {isLoggedIn && userRole === "ROLE_ADMIN" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin Panel
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/find-booking">
                My Reservations
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                onClick={() => setShowAccount(!showAccount)}
              >
                Account
              </a>
              <ul className={`dropdown-menu ${showAccount ? "show" : ""}`}>
                {isLoggedIn ? (
                  <Logout />
                ) : (
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
