import {NavLink} from 'react-router-dom';
import './Inicio.css';

export default function Inicio() {
    return (
        <section className="inicio">
            
            <h1>
                Hola Bienvenido a Ver Perros 🐩🐕🐕‍🦺🦮🐶
            </h1>
            <NavLink exact to="/dogs" >
                <img className='image_inicio' src="https://i.imgur.com/6OpmdY9.png"  alt='Imagen de perros'/>
            </NavLink>
            <br></br>
            <br></br>
            <NavLink className='link' exact to="/dogs" >Iniciar</NavLink>
        </section>
    )
}