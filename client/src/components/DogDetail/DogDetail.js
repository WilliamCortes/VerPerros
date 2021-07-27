import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { removegetDogsLoaded, getDog, addDogFavorite} from '../../actions';
import './DogDetail.css';


function DogDetail(){
    const dispatch = useDispatch();
    const dogDetail = useSelector( state => state.dogDetail);
    const dogsFavorites = useSelector( state => state.dogsFavorites)

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

    const dogFovotite = dogsFavorites?.map(d => d.id === dogDetail?.id ).includes(true)


    if(dogDetail === 'Id no válido' ){
        return(
            <h1> Raza no encontrada...🐶</h1>
        )
    }else if(dogDetail === undefined){
        return(<h1>Cargando...🐕</h1>)
    }else{
       
        return(
            <div className='container_dogdetail'> 
                <div className='dogdetail'>
                    Nombre:
                    <h1>{dogDetail.name}</h1>
                    <h4>Temperamentos: <br></br><br></br>{dogDetail.temperaments[0].name}</h4>
                    <div className='dates'>
                        <div>Altura:   {dogDetail.height}</div>
                        <div>Peso:   {dogDetail.weight}</div>
                        <div>Años de vida:  {dogDetail.years_life}</div>
                    </div>
                    <br></br>
                    {/* <p>{`Altura: ${dogDetail.height}   Peso: ${dogDetail.weight} Años de vida: ${dogDetail.years_life}`}</p> */}
                 
                    <picture className='image_contain'>
                        <img className="image_dogdetail" src={dogDetail.image} alt="" />
                    </picture>
                        <br></br>
                    <button
                    className={`${dogFovotite && "disabled"}`}        
                    onClick={ () => dispatch(addDogFavorite(
                        { id: dogDetail.id, name: dogDetail.name, image: dogDetail.image, temperaments: dogDetail.temperaments[0].name, years : dogDetail.years_life}))} >Favorite</button>
                </div>
            </div>
        )
    }
}

export default DogDetail;