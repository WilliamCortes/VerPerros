import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { removegetDogsLoaded, getDog, addDogFavorite} from '../../actions';
import './DogDetail.css';


function DogDetail(){
    const dispatch = useDispatch();
    const dogDetail = useSelector( state => state.dogDetail);
    const { id } = useParams();
    useEffect( () => {
        dispatch(getDog(id))
        return () => {
            dispatch(removegetDogsLoaded())
        }
    },[dispatch, id])

    useEffect(()=>{
        document.title = `${dogDetail?.name ? dogDetail.name : 'DogDetail'}`
    },[dogDetail]) 

    if(dogDetail === 'Id no válido' ){
        return(
            <h1> Raza no encontrada...🐶</h1>
        )
    }else if(dogDetail === undefined){
        return(<h1>Cargando...🐕</h1>)
    }else{
       
        return(
            <div className='container_dogdetail'> 
                <div id='dogdetail'>
                    <span>Nombre:</span>
                    <h1>{dogDetail.name}</h1>
                    <h5></h5>
                    <p>Temperamentos: {dogDetail.temperaments[0].name}</p>
                    <p>{` Altura: ${dogDetail.height}   Peso: ${dogDetail.weight}   Años de vida: ${dogDetail.years_life}`}</p>
                    <p></p>
                    <p></p>
                    <p></p>

                    <img id="img_dogdetail" src={dogDetail.image} alt="" />
                    <button onClick={ () => dispatch(addDogFavorite(
                        { id: dogDetail.id, name: dogDetail.name, image: dogDetail.image, temperaments: dogDetail.temperaments[0].name, years : dogDetail.years_life}))} >Favorite</button>
                </div>
            </div>
        )
    }
}

export default DogDetail;