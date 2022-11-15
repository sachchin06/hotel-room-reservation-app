import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Navbar = () => {

  const {user} = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="navContainer">
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#545e6f",
            textDecoration: "none"
          })}
          to="/"
        >
          <span className="logo">lambooking</span>
        </NavLink>

        {user ? user.username : (
        <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>
        )}
      </div>
    </div>
  );
};
