/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import { RxHome } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";

import "../../App.css";
import "./styles.css";

const Navbar = () => {
    return (
            <nav className="container">
              <section className="navbar-content">
                <div className="navbar-menu-item">
                  <RxHome className="icon"/>
                    <h3> / Dashboard </h3>
                  </div>
                <div className="navbar-title-layout">
                  <h4> Dashboard RPA </h4>
                </div>
                  <div className="navbar-icons">
                    <IoMdNotificationsOutline className="notification-icon"/>
                    <Link to="/Dashboard/Login">
                      <CgProfile className="icon"/>
                    </Link>
                        <IoSettingsOutline className="icon"/>
                    </div>
                  </section>
                <section className="data-filters">
                  <button className="calendar-btn blue-linear">
                    <a className="calendar-title"> Hoje </a>
                      <FiCalendar className="calendar-icon"/>
                  </button>
                <h1> Última Atualização: 01/03/2023 - 10:00:00 </h1>
                </section>
              </nav>
    );
};

export default Navbar;