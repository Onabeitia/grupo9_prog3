import React from 'react';
import { Link } from 'react-router-dom'
import Buscador from '../Buscador/Buscador';
import './styles.css';


function Header(props) {

    return (
        <nav>
            <ul className='header'>
                <li><Link to='/' className='header2' >Home</Link></li>
                <li><Link to='/favorites' className='header2'>Favoritos</Link></li>
                <li><Link to='/peliculasp' className='header2'>Peliculas populares</Link></li>
                <li><Link to='/seriesP' className='header2'>Series populares</Link></li>
                <li><Buscador /></li>
            </ul>

            <div className='header'>
                <h2>Udesa movies</h2>
                <img src='https://images.vexels.com/media/users/3/203729/isolated/preview/d09f43d4116d9480cc034009b62428a7-dibujado-a-mano-camara-de-cine-de-cine.png' alt="logo" className='logo-img'></img>
            </div>

        </nav>
    )
}



export default Header;