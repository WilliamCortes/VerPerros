import React from 'react';
// import SearchBar from './SearchBar.jsx';
import './Nav.css';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <header className="navbar">
            
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <NavLink exact to="/dogs" >Home</NavLink>
                        <NavLink to="/favorites" >Favoritos</NavLink>
                        <NavLink to="/create_dog" >Agregar Una Raza </NavLink>
                    </li>
                </ul>
            </nav>
            
        </header>

  );
};

export default Nav;


