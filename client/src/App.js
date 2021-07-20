import {Route} from 'react-router';
import './App.css';
import Home from './components/Home/Home';
import Favorites from './components/Favorites/Favorites';
import DogDetail from './components/DogDetail/DogDetail';
import Inicio from './components/Inicio/Inicio';
import Nav from './components/Nav/Nav';
// import DogsLoaded from './components/DogsLoaded/DogsLoaded';
import CreateDog from './components/CreateDog/CreateDog';

function App() {

  return (
    <div className="App">
      <header>
        <Route  path='/' component={Nav} />
        <Route exact path='/' component={Inicio} />
        <Route exact path='/dogs' component={Home} />
        <Route exact path='/favorites' component={Favorites} />
        {/* <Route exact path='/loaded' component={DogsLoaded} /> */}
        <Route exact path='/dogs/:id' component={DogDetail} />
        <Route exact path='/create_dog' component={CreateDog} />
      </header>
    </div>
  );
}

export default App;
