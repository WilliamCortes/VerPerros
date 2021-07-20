import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllDogs,  } from '../../actions'
import Search from '../Search/Search';
import DogsLoaded from '../DogsLoaded/DogsLoaded';
import DogsTemperaments from '../DogsTemperements/DogsTemperaments';
import DogsOrder from '../DogsOrder/DogsOrder';
import Dog from '../Dog/Dog';
import './Home.css';


function Home(){
    const dispatch = useDispatch();
    const dogs = useSelector( state => state.dogs)
    const dogsLoaded = useSelector( state => state.dogsLoaded)
    const dogsTemperaments = useSelector( state => state.dogsTemperaments)
    const dogsOrder = useSelector( state => state.dogsOrder);

    document.title='Home'
    useEffect( () => {
        dispatch(getAllDogs())
      }, [])


    if(Array.isArray(dogsLoaded ) && dogsLoaded.length ) return <DogsLoaded/>      
    if(Array.isArray(dogsTemperaments ) && dogsTemperaments.length ) return <DogsTemperaments/>   
    if(dogsOrder)return <DogsOrder/>
    return (
        <div>
            <Search/>
            { dogsLoaded?.length && <h3>{dogsLoaded}</h3> }
            <ul className= 'container' >
                {
                    Array.isArray(dogs) ? dogs?.map( dog =>( dog &&
                        <li className='dog' key={dog.id}>
                            <Dog dog ={dog}/>
                            {/* <Link to={`/dogs/${dog.id}`}>{dog.name}</Link>
                            <br></br>
                            <img className="" src={dog.image} width="100" height="auto" alt="" />
                            <h5>{dog.temperaments[0] ? dog.temperaments[0].name : 'Esta raza no tiene temperamentos'}</h5>
                            <h5>holiss</h5>
                            <button onClick={ () => dispatch(addDogFavorite({ id: dog.id, name: dog.name, image: dog.image, temperaments: dog.temperaments[0].name, years : dog.years_life}))} >Favorite</button> */}
                        </li>
                        
                    )) : <h1>Cargando...🏃‍♂️...🏋️‍♂️</h1>
                }
            </ul>

        </div>
    )
}

export default Home;