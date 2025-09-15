import React from 'react';
import { Link } from 'react-router-dom'
//import MiFormulario from '../MiFormulario/MiFormulario';
import './styles.css';


function Header() {
   return (
       <nav>

           <ul className='header'>
               <li><Link to='/' className='' >Home</Link></li>
               <li><Link to='/movies' className='header2'>Movies</Link></li>
               <li><Link to='/series' className='header2'>Series</Link></li>
               <li><Link to='/favorites' className='header2'>Favorites</Link></li>
           </ul>
    
       </nav>
   )
}



export default Header;