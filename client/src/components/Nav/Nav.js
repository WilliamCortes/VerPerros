import React from 'react';
// import SearchBar from './SearchBar.jsx';
import './Nav.css';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <header className="navbar">
            
            <nav>
                <ul >
                    <li className="list-item">
                        <NavLink  exact to="/dogs" >Home</NavLink>
                    </li>
                    <li className="list-item">
                        <NavLink  to="/favorites" >Favoritos</NavLink>
                    </li>
                    <li className="list-item">
                        <NavLink  to="/create_dog" >Agregar Una Raza </NavLink>
                    </li>
                </ul>
            </nav>
            
        </header>

  );
};

export default Nav;


