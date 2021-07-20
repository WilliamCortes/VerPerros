import {NavLink} from 'react-router-dom';

export default function Inicio() {
    return (
        <section className="inicio">
            <img src="https://i.imgur.com/6OpmdY9.png" alt='Imagen de perros'/>
            <div>
                hola Bienvenido a ver perros 🐩🐕🐕‍🦺🦮🐶
            </div>
            <NavLink exact to="/dogs" >Iniciar</NavLink>
        </section>
    )
}