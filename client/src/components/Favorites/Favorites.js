import React, { Component } from "react";
import { connect } from "react-redux";
import { removeDogFavorite } from '../../actions';
import Dog from '../Dog/Dog';
// import './Favorites.css';


export class Favorites extends Component {
  render() {
    document.title='Favorites'
    return (
      
      <div >
      <h2>Razas Favoritas</h2>
        <ul className= 'container'>
          {
            this.props.dogsFavorites && this.props.dogsFavorites.map(dog =>(
              <div className='dog' key={dog.id}>
                  <Dog dog ={dog}/>

                {/* <Link to={`/dogs/${dog.id}`}>
                  {dog.name}
                </Link>
               <br></br>
               <br></br>
               <img src={dog.image} width="300" height="auto" alt=""/>
                <h5>{dog.temperaments}</h5>
                <p>Años de vida: {dog.years}</p>*/}

                <button onClick={() => this.props.removeDogFavorite(dog.id)}>Remove</button> 

              </div>
            ))
          }
        </ul>
      </div>
      
    );
  }
}


function mapStateToProps(state) {
  return {
    dogsFavorites: state.dogsFavorites
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeDogFavorite: id => dispatch(removeDogFavorite(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);