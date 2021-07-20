import {useEffect, useState} from 'react';
// import { useDispatch, useSelector} from 'react-redux';
// import {getDogsOrder} from './actions';


export const UseOrderDogs = () =>{
    // console.log('Order dogs: ' , state)//name=alfabeto peso state boolean
    const [data, setData] = useState([])

    useEffect( () => {
        const getData = async () => {
            const res = await fetch('http://localhost:3001/dogs/?todas=true')
            const data = await res.json()
            setData(data)
        }
        getData()
    }, []);

    return[data]

}
