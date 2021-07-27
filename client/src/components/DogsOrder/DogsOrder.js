import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {UseOrderDogs} from './UseOrderDogs';
import {removeDogsOrder, } from '../../actions';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';


function quickSort(array) {
    
    let left = []
    let rigth = []
    if (array.length < 2) return array;
    for (let i = 1; i < array.length; i++) {
        parseInt(array[i].weight.split(' ')[0]) > parseInt(array[0].weight.split(' ')[0]) ? rigth.push(array[i]) : left.push(array[i]);
    }
    return quickSort(left).concat(array[0]).concat(quickSort(rigth));
}

function alfReverse(array){
    const resp = []
    for(let i = array.length -1; i>=0; i--){
        resp.push(array[i])
    }
    return resp
}

const DogsOrder = () =>{

    const  [dogOrderHook] = UseOrderDogs()  
    document.title = 'DogsOrder';
    const dispatch = useDispatch()
    const {name, state} = useSelector( state => state.dogsOrder);
    let response = []
     if(name){
        switch(name){
            case 'alfabeto'://a-z
                state?
                    response= dogOrderHook 
                 :
                    response= alfReverse(dogOrderHook)
                break

            case 'peso'://min-max
                state?
                    response= quickSort(dogOrderHook)
                :
                    response= quickSort(dogOrderHook).reverse()
                break
            default:
                response = `Uppps no pude ordenar los 🐶🐶🐶. name = ${name} y state = ${state} `

        }
    }


    return(
        <div>
            <Search/>
            <h2>{name === 'alfabeto' &&`Perros Odenados por:  ${name}  ${ state ? 'A -Z' : 'Z - A'}`}</h2>
            <h2>{name === 'peso' &&   `Perros Odenados por:  ${name}  ${ state ? 'Min - Max' : 'Max - Min'}`}</h2>
            <Pagination response={response}/>

            <button onClick={()=> dispatch(removeDogsOrder())}>Ver Razas Aleatorias</button>
        </div>
    )
}

export default DogsOrder;
  

// const dogsa=[
// {id: "58a415d6-1b7e-4493-9dfc-d36c60e06508", name: "Affenpinscher", weight: "6 - 13", image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg", next_id: "f7ba4cf7-76b6-4218-90f6-408815375cc3"},
// {id: "f7ba4cf7-76b6-4218-90f6-408815375cc3", name: "Afghan Hound", weight: "50 - 60", image: "https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg", next_id: "70c53ad8-20e5-41ec-85b5-842d2c7bc1f2"},
// {id: "70c53ad8-20e5-41ec-85b5-842d2c7bc1f2", name: "African Hunting Dog", weight: "44 - 66", image: "https://cdn2.thedogapi.com/images/rkiByec47.jpg", next_id: "48f992ca-0927-4745-b750-7f2210543a04",},
// {id: "48f992ca-0927-4745-b750-7f2210543a04", name: "Airedale Terrier", weight: "40 - 65", image: "https://cdn2.thedogapi.com/images/1-7cgoZSh.jpg", next_id: "14f879ad-f8d0-4384-8ad9-6dbfeaec72a2"},
// {id: "14f879ad-f8d0-4384-8ad9-6dbfeaec72a2", name: "Akbash Dog", weight: "90 - 120", image: "https://cdn2.thedogapi.com/images/26pHT3Qk7.jpg", next_id: "26978ffe-52bd-47af-81df-15cdaa221862"},
// {id: "26978ffe-52bd-47af-81df-15cdaa221862", name: "Akita", weight: "65 - 115", image: "https://cdn2.thedogapi.com/images/BFRYBufpm.jpg", next_id: "e6274ac1-b0ea-4c6f-a55c-408705281b06"},
// {id: "e6274ac1-b0ea-4c6f-a55c-408705281b06", name: "Alapaha Blue Blood Bulldog", weight: "55 - 90", image: "https://cdn2.thedogapi.com/images/33mJ-V3RX.jpg", next_id: "50c90c14-6c3a-4099-8e1e-c2b869ee290a"},
// {id: "50c90c14-6c3a-4099-8e1e-c2b869ee290a", name: "Alaskan Husky", weight: "38 - 50", image: "https://cdn2.thedogapi.com/images/-HgpNnGXl.jpg", next_id: "c000de80-4ef3-4b46-8552-ba87107248cb"},
// {id: "c000de80-4ef3-4b46-8552-ba87107248cb", name: "Alaskan Malamute", weight: "65 - 100", image: "https://cdn2.thedogapi.com/images/dW5UucTIW.jpg", next_id: "c5dd5ed0-12c4-410c-a9fa-6895fd0a017e"},
// {id: "c5dd5ed0-12c4-410c-a9fa-6895fd0a017e", name: "American Bulldog", weight: "60 - 120", image: "https://cdn2.thedogapi.com/images/pk1AAdloG.jpg", next_id: "2a6e0fe9-a703-4191-8d5e-4fdfde998eaf", },
//  {id: "2a6e0fe9-a703-4191-8d5e-4fdfde998eaf", name: "American Bully", weight: "30 - 150", image: "",}, ]

