import React, { ReactNode, useContext } from "react";
import { NavLink } from "react-router-dom";
import { BRIDGES_ROUTE, CHART_ROUTE, INSPECTORS_ROUTE, MAIN_ROUTE, SENSOR_DATAS_ROUTE, SENSOR_TYPES_ROUTE, SENSORS_ROUTE } from "../../consts";

interface IProps {
  children: ReactNode;
}

interface ILink {
  link: string;
  text: string;
  roles?: string[];
}

const applicationLinks: ILink[] = [
  { link: MAIN_ROUTE, text: "Home" },
  { link: BRIDGES_ROUTE, text: "Bridges" },
  { link: INSPECTORS_ROUTE, text: "Inspectors" },
  { link: SENSORS_ROUTE, text: "Sensors" },
  { link: SENSOR_DATAS_ROUTE, text: "Sensor datas" },
  { link: SENSOR_TYPES_ROUTE, text: "Sensor types" },
  { link: CHART_ROUTE, text: "Charts" },
];

export const Navbar = ({ children }: IProps) => {

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
          <div className="container">
            <NavLink to={MAIN_ROUTE} className="navbar-brand">
              Bridge App
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target=".navbar-collapse"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
              <ul className="navbar-nav flex-grow-1">
                {applicationLinks.map(({ link, text }) => (
                  <li className="nav-item" key={link}>
                    <NavLink to={link} className="nav-link text-dark">
                      {text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="container">
        <main role="main" className="pb-3">
          {children}
        </main>
      </div>
    </div>
  );
};
