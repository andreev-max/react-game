import React from 'react'
import { NavLink } from 'react-router-dom'
import brainIcon from '../icons/brain.png'

export const Navbar = () => {
 return (
  <nav className="navbar">
  <div className="navbar-brand">
    <img src={brainIcon}
    alt={"brain icon"}
    className="brand-icon" />
    <h1 className="brand-title" >Memory</h1>
  </div>
  
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="link"
          to="/"
        exact
        >Home</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="link"
          to="/settings"
          >Settings
          </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink className="link"
          to="/about"
          >About
          </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="link"
          to="/statistics"
          >Statistics
          </NavLink>
          </li>
        </ul>
  </nav>
 )
}