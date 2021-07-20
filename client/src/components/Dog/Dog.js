import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {addDogFavorite} from '../../actions';
import './Dog.css';


const Dog = (dog) =>{
    const dispatch = useDispatch();
    dog = dog?.dog

    const handleClick=(e) =>{
        e.preventDefault()
        if(dog?.id && dog?.name && dog?.image && dog?.temperaments && dog?.years_life ){
        dispatch(addDogFavorite(
            { id: dog?.id, 
            name: dog?.name, 
            image: dog?.image, 
            temperaments: dog?.temperaments[0]?.name, 
            years : dog?.years_life
            }))
        }
    }
    
    return(
        <div className='dog_container'>
            <Link className='link' to={`/dogs/${dog?.id}`}>{dog?.name}</Link>
            <Link className='' to={`/dogs/${dog?.id}`}>
                <img className="" src={dog?.image}  alt="" />
            </Link>
            {dog?.temperaments && <h5>Temperamentos: <br></br> {dog?.temperaments[0] ? dog?.temperaments[0]?.name : 'Esta raza no tiene temperamentos'}</h5>}
            {dog?.years && <p>Años de vida: {dog?.years}</p>}
            {dog?.weight && <p>Peso: {dog?.weight}</p>}
            {dog?.height && <p>Altura: {dog?.height}</p>}
            {(document.title !== 'Favorites' && document.title !== 'DogsOrder') && <button onClick={ (e) => handleClick(e) } >Favorite</button>}            
        </div>
    )
}

export default Dog;