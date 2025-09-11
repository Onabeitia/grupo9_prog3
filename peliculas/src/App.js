import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Movies from './screens/Movies';
import Buscar from './screens/Buscar';
import Favpelis from './screens/Favpelis';

function App() {
  return (
    <BrowserRouter>
      <header className="site-header">
        <nav>
          <Link to="/">Inicio</Link> {' | '}
          <Link to="/buscar">Buscar</Link>
          <Link to="/favpelis">Favoritos</Link>
        </nav>
      </header>

      <main className="container">
        <Switch>
          <Route path="/" exact component={Movies} />
          <Route path="/buscar" component={Buscar} />
          <Route path="/favpelis" component={Favpelis} /> 

        </Switch>
      </main>

      <footer className="site-footer">
      </footer>
    </BrowserRouter>
  );
}
export default App;