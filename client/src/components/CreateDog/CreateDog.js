import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { addDog, clearDogsAdd, getTemperaments } from '../../actions';
import './CreateDog.css';



// function validate(input) {
    
//     let errors = {};
//     if (!input.name) {
//       errors.name = 'Nombre es requeredo';
//     } else if (input.name.length <3) {
//       errors.name = 'Nombre es Invalido';
//     }
//     if (!input.weight) {
//       errors.weight = 'El Peso es requerido';
//     } else if (input.name.split(' ') !== 3 || typeof(input.name.split(' ')[0]) !== 'number' || typeof(input.name.split(' ')[3]) !== 'number'  ) {
//       errors.weight = 'El Peso es invalido';
//     }
//     if (!input.height) {
//       errors.height = 'Altura es requerida';
//     } else if (/^-?[0-9]+([.][0-9]+)?$/.test(input.height)) {
//       errors.height = 'Altura es invalida';
//     }
//     return errors;
// };
function validate(input) {
    
    let errors = {};
    if (!input.name) {
      errors.name = 'Nombre es requeredo';
    } else if (/^\s+$/.test(input.name)) {
      errors.name = 'Nombre es Invalido';
    }
    if (!input.weight) {
      errors.weight = 'El Peso es requerido';
    // } else if (/^[\d\s]{1,60}$/.test(input.weight)) {
    } else if (/^\d{2,6}$/.test(input.weight)) {
      errors.weight = 'El Peso es invalido';
    }
    if (!input.height) {
      errors.height = 'Altura es requerida';
    } else if (/^-?[0-9]+([.][0-9]+)?$/.test(input.height)) {
      errors.height = 'Altura es invalida';
    }
    return errors;
};

const CreateDog =  () => {

    const dispatch = useDispatch();
    const dogsAdd = useSelector( state => state.dogsAdd)
    const temperamentsDb = useSelector( state => state.temperamentsDb)
    const [input, setInput] = useState({name:'', weight:'', height:'', years_life:'', temperaments:'',});
    const [errors, setErrors] = useState({});
    document.title='CreateDog'
    
    useEffect( () => {
        dispatch(getTemperaments())
      }, [])

    const handleInputChange = function(e) {
        setErrors(validate({
          ...input,
          [e.target.name]: e.target.value
    }));
    setInput({
        ...input,
        [e.target.name]: e.target.value
      });
    }

    const handleSubmit = e =>{
      e.preventDefault();
      dispatch(addDog({name:input.name, weight:input.weight, height:input.height, years_life:input.years_life, temperaments: input.temperaments}))
      setInput({name:'', weight:'', height:'', years_life:'', temperaments:'',})
    }

    const handleChange = (event) =>{
      setInput({...input, [event.target.name]: event.target.value,})
    }

    const clearDogAdd = (e) =>{
        e.preventDefault()
        dispatch(clearDogsAdd())
        setInput({name:'', weight:'', height:'', years_life:'', temperaments:'',})
    }

    return(
        <section>
            <h3> Aquí podras Agregar una nueva raza de perro</h3>
            <br></br>
        {   typeof(dogsAdd) ==="object" ?
            <div>
                 <h3> {dogsAdd.name} </h3>
                 <h3>Ha Sido Creado Exitosamente</h3>
                <button type='button' onClick={clearDogAdd } >Presiona para continuar</button>
            </div>
            :
            <>
            <form className='form_dogs' onSubmit={ e => handleSubmit(e)}>
                <label>Nombre  </label>
                <input className={errors.name && 'danger'} name="name" value={input.name} placeholder='nombre' onChange={handleChange, handleInputChange}/>
                <br></br>
                {errors.name && (
                    <p className="danger">{errors.name}</p>
                )}
                <br></br>
                <label>Peso (Min - Max)  </label>
                <input className={errors.weight && 'danger'} name="weight" value={input.weight} placeholder='Min - Max' onChange={handleChange, handleInputChange}/>
                <br></br>
                {errors.weight && (
                    <p className="danger">{errors.weight}</p>
                )}
                <br></br>
                <label>Altura (Min - Max)  </label>
                <input className={errors.height && 'danger'}  name="height" value={input.height}placeholder='Min - Max' onChange={handleChange, handleInputChange}/>
                <br></br>
                {errors.height && (
                    <p className="danger">{errors.height}</p>
                )}
                <br></br>
                <label>Años de Vida (Min - Max)  </label>
                <input name="years_life" value={input.years_life} placeholder='Min - Max' onChange={handleChange}/>
                <br></br>
                <br></br>
                <label>Temperamentos  </label>
                <input name="temperaments" value={input.temperaments} onChange={handleChange}/>
                <br></br>
                <br></br>
                <label>
                    Elije uno o más Temperamentos
                <input list="temperaments" name="temperaments" onChange={handleChange} />  
                </label>   
                <datalist id="temperaments"  >
                    {
                        temperamentsDb?.map( (t, key) => (
                            <option key={key} value={t} />  
                        ))

                    }  
                </datalist>
                <br></br>
                <h5> Aquí Puedes Ver Los Temperamentos</h5>
                <select name="select" >
                {
                    temperamentsDb?.map( (t, key) => (
                        <option key={key} value={t}>{t}</option>  
                    ))
                }
                </select>
                <br></br>
                <br></br>
                <button type="submit">Crear Nueva Raza</button>
            </form>
            </>
        }
        </section>
    )
}

export default CreateDog;