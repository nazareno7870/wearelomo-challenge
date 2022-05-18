import Lomo from "../../assets/lomo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="navBar">
        <div className="navBar__content">
          <div className="navBar__content__logo">
            <img src={Lomo} alt="logo" />
          </div>
          <div className="navBar__menu">
            <ul>
              <li>
                <Link to="/">ToDo List</Link>
              </li>
              <li>
                <Link to="/users">ABM Users</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navMobile">
          <div
            className={isOpen ? "topnav__icon open" : "topnav__icon"}
            onClick={handleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="navMobile__content" style={{top: isOpen ? '48px' : '-118px'}}>
        <div className="navMobile__content__logo">
          <img src={Lomo} alt="logo" />
        </div>
        <div className="navMobile__menu">
          <ul>
            <li>
              <Link to="/" onClick={()=>setIsOpen(false)}>ToDo List</Link>
            </li>
            <li>
              <Link to="/users" onClick={()=>setIsOpen(false)}>ABM Users</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
