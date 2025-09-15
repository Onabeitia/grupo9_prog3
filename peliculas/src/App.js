import React from "react"
import {Switch , Route} from 'react-router-dom'
import Home from './screens/Home/Home'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Populares from './screens/Populares/Populares'
import Valoradas from './screens/Valoradas/Valoradas'


function App() {
  return (
   <React.Fragment>
    <Header/>
    <Switch>
      <Route path='/' component={Home} exact={true}/> 
      <Route path='/populares' component={Populares}/> 
      <Route path='/Valoradas' component={Valoradas}/> 
    </Switch>
    <Footer />
   </React.Fragment>
  );
}

export default App;
