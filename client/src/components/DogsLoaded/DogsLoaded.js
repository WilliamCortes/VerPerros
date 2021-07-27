import React  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Search from '../Search/Search';
import {removegetDogsLoaded, } from '../../actions';
import Dog from '../Dog/Dog';
import './DogsLoaded.css';



const DogsLoaded = () =>{
    const dogsLoaded = useSelector( state => state.dogsLoaded)
    const dispatch = useDispatch();
    document.title='DogsLoaded'
    

    const handleSubmit =  (e) =>{
        e.preventDefault();
        dispatch(removegetDogsLoaded())
    }
    return(
        <div>
            <Search/>
            <h1>Razas Encontradas por Nombre </h1>
            <ul className='container'>
            {
            dogsLoaded.map( dog =>(
                        <li className='dog'  key={dog.id}>
                        <Dog dog ={dog}/>

                            {/* <Link to={`/dogs/${dog.id}`}>{dog.name}</Link>
                            <br></br>
                            <img className="iconoClima" src={dog.image} width="100" height="auto" alt="" />
                            <button onClick={ () => dispatch(addDogFavorite({ id: dog.id, name: dog.name, image: dog.image, temperaments: dog.temperaments[0].name, years : dog.years_life}))} >Favorite</button> */}
                        </li>
                    ))
            }
            </ul>
            <button type="button" onClick={ (e) => handleSubmit(e)}>Ver Otras Razas</button>
            <br></br>

        </div>
    )
}

export default DogsLoaded;