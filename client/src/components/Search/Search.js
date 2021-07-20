import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {  getTemperaments, getDogTemperament, getDogsLoaded, getDogsOrder,removegetDogsLoaded, removedogsTemperaments } from '../../actions';
import './Search.css';


const Search = ()=>{

    const dispatch = useDispatch();
    const temperamentsDb = useSelector( state => state.temperamentsDb)
    const [state, setState] = useState({title: "", temperament:"",alfabeto: true, peso: true,})


    useEffect( () => {
        if(!temperamentsDb) dispatch(getTemperaments())
      }, [])

    const handleChange = (event) => {
        event.preventDefault();
        setState({ ...state, [event.target.name]: event.target.value });
      }


    const handleSubmit = (event) => {
        event.preventDefault();
        // state.title? dispatch(getDogs(state.title)) : alert('No has colocado una raza 🤷‍♂️')
        dispatch(getDogsLoaded(state.title))
        setState({ ...state, title: ""});
      }
    const handleTemperament = (e) => {
        e.preventDefault();
        state.temperament? dispatch(getDogTemperament(state.temperament)) : alert('No has colocado un Temperamento 🤷‍♂️')
       dispatch(removegetDogsLoaded())
        setState({...state, temperament: ""});

    }
    
    const handleOrder = (e, name) => {
        e.preventDefault();
        dispatch(getDogsOrder({name, state: state[name]}))
        dispatch(removegetDogsLoaded())
        dispatch(removedogsTemperaments())
     }

    return(
        <div>
            <h2>Buscador</h2>
            <form className="form-container" >
                    <label  >Buscar Por Raza de Perro: </label>
                    <input name='title' placeholder='Todas' value={state.title} onChange={(e) => handleChange(e)} />
                    <button className={!(state.title?.length) && 'none'} type="button" onClick={(e) => handleSubmit(e)}>BUSCAR</button>
                    <br></br>
                    <label > Buscar  Por Temperamento de Perro: </label>
                    <select name="temperament" value={state.temperament} onChange={(e) => handleChange(e)} >
                    {
                        temperamentsDb?.map( (t, key) => (
                            <option key={key} value={t}>{t}</option>  
                        ))
                    }
                    </select>
                    <br></br>
                    <button className={!state.temperament.length && 'none'} type="button" name="temperament" onClick={(e) => handleTemperament(e)}>BUSCAR</button>
                    <br></br>
                    <label >Ordenar Alfabeticamente por Raza: </label>
                    <input type="button" name='alfabeto' onClick={() => setState({...state, alfabeto : !state.alfabeto })} value={state.alfabeto? 'A -Z' : 'Z - A' } />
                    <button type="button" onClick={(e,) => handleOrder(e, 'alfabeto')} >ORDENAR</button>
                    <br></br>
                    <label >Ordenar por el Peso: </label>
                    <input type="button" name='peso' onClick={() => setState({...state, peso : !state.peso })} value={state.peso? 'Min - Max ' : 'Max - Min'} />
                    <button type="button" onClick={(e) => handleOrder(e, 'peso')}>ORDENAR</button>
                    <br></br>

            </form>
        </div>
    )
};

export default Search;