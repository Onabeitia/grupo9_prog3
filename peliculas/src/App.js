import React from "react"
import { Switch, Route } from 'react-router-dom'
import Home from './screens/Home/Home'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import PeliculasP from "./screens/PeliculasP/PeliculasP"
import SeriesP from "./screens/SeriesP/SeriesP"
import NotFound from './screens/NotFound/NotFound'
import Favoritos from "./screens/Favoritos/Favoritos"
import Peliculas from './screens/Peliculas/Peliculas'
import Series from './screens/Series/Series'
import Detalle from "./screens/Detalle/Detalle"
import ResultadosB from './screens/ResultadosB/ResultadosB'

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path='/' component={Home} exact={true} />
        <Route path='/peliculas' component={Peliculas} />
        <Route path='/series' component={Series} />
        <Route path='/detalle/:tipo/:id' component={Detalle} />
        <Route path='/peliculasp' component={PeliculasP} />
        <Route path='/seriesp' component={SeriesP} />
        <Route path='/favorites' component={Favoritos} />
        <Route path='/resultadosb/:busqueda/:tipo' component={ResultadosB} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;
