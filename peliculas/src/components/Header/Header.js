import React from 'react';
import { Link } from 'react-router-dom'
import './styles.css';


function Header() {
    return (
        <nav>
            <ul className='header'>
                <li><Link to='/' className='' >Home</Link></li>
                <li><Link to='/peliculas' className='header2'>Peliculas</Link></li>
                <li><Link to='/series' className='header2'>Series</Link></li>
                <li><Link to='/favorites' className='header2'>Favoritos</Link></li>
                <li><Link to='/populares' className='header2'>Populares</Link></li>
                <li><Link to='/valoradas' className='header2'>Mas valoradas</Link></li>
            </ul>
            <div className='logo'>
                <h2>Udesa movies</h2>
                <img src='https://images.vexels.com/media/users/3/203729/isolated/preview/d09f43d4116d9480cc034009b62428a7-dibujado-a-mano-camara-de-cine-de-cine.png' alt="logo" className='logo-img'></img>
            </div>

        </nav>
    )
}



export default Header;