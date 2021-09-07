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
    } else if (!/^\w{2,30}$/.test(input.name)) {
      errors.name = 'Nombre es Invalido';
    }
    if (!input.weight) {
      errors.weight = 'El Peso es requerido';
    // } else if (/^[\d\s]{1,60}$/.test(input.weight)) {
    } else if (!/^\d{1,2}\ \-\ \d{1,2}$/.test(input.weight)) {
    // } else if (!/!^(?!$)(?:[0-9]|100)$gm/g.test(input.weight)) {
      errors.weight = 'El Peso es invalido';
    }
    if (!input.height) {
      errors.height = 'Altura es requerida';
    // } else if (/^-?[0-9]+([.][0-9]+)?$/.test(input.height)) {
    } else if (!/^\d{1,2}\ \-\ \d{1,2}$/.test(input.height)) {
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
          <br></br>
            <h1> Aquí podras Agregar una nueva raza de perro</h1>
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
              <section className='section_create'>
                <label>Nombre  </label>
                <input className={errors.name && 'danger'} name="name" value={input.name} placeholder='nombre' onChange={handleChange, handleInputChange}/>
                <br></br>
                {errors.name && (
                    <p className="danger">{errors.name}</p>
                )}
              </section>
              <section className='section_create'>
                <br></br>
                <label>Peso (Min - Max)  </label>
                <input className={errors.weight && 'danger'} name="weight" value={input.weight} placeholder='Min - Max' onChange={handleChange, handleInputChange}/>
                <br></br>
                {errors.weight && (
                    <p className="danger">{errors.weight}</p>
                )}
              </section>
              <section className='section_create'>
                <br></br>
                <label>Altura (Min - Max)  </label>
                <input className={errors.height && 'danger'}  name="height" value={input.height}placeholder='Min - Max' onChange={handleChange, handleInputChange}/>
                <br></br>
                {errors.height && (
                    <p className="danger">{errors.height}</p>
                )}
              </section>
              <section className='section_create'>
                <br></br>
                <label>Años de Vida (Min - Max)  </label>
                <input name="years_life" value={input.years_life} placeholder='Min - Max' onChange={handleChange}/>
                <br></br>
                <br></br>
              </section>
              <section className='section_create'>
                <label>Puedes incluir uno o más Temperamentos  </label>
                <input name="temperaments" multiple value={input.temperaments} onChange={handleChange}/>
                <br></br>
                <br></br>
                <label>
                    Temperamentos
                <input list="temperaments" multiple  className='temperaments' autoComplete='off' name="temperaments" onChange={handleChange} />  
                </label>   
                <datalist  id="temperaments" multiple  >
                    {
                        temperamentsDb?.map( (t, key) => (
                            <option key={key} value={t} />  
                        ))

                    }  
                </datalist>
                </section>
                {/* <h5> Aquí Puedes Ver Los Temperamentos</h5>
                <select name="select" >
                {
                    temperamentsDb?.map( (t, key) => (
                        <option key={key} value={t}>{t}</option>  
                    ))
                }
                </select> */}
                <br></br>
                <br></br>
                <button 
                className={`${(Object.keys(errors).length || !errors) && "disabled"}`}
                type="submit">Crear Nueva Raza</button>
            </form>
            </>
        }
        </section>
    )
}

export default CreateDog;