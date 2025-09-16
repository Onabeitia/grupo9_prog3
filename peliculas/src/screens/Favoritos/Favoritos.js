import React, { Component } from 'react';
import Cards from '../../components/Cards/Cards';
import './style.css';

class Favoritos extends Component {
  constructor(props) {
   super(props);
    this.state = {
      favoritos: [],
      verMas: false,
      textoBoton: 'Ver mas',
      error: '',
      loading: true
    };
  }
  componentDidMount() {
    let favoritosStr = localStorage.getItem('favorito');
    let favoritos = [];

    if (favoritosStr !== null) {
      favoritos = JSON.parse(favoritosStr);
    }

    this.setState({ favoritos: favoritos, loading: false });
  }
  render() {
    const { favoritos } = this.state;
    return (
      <main className="favoritos">
        <h1>Películas Favoritas</h1>
        <div className="grid">
          {favoritos.length === 0 ? (
            <p className='nopeli'>No tenés favoritos todavía.</p>
          ) : (
            favoritos.map(movie => (
              <Cards key={movie.id} movie={movie} />
            ))
          )}
        </div>
      </main>
    );
  }
}
export default Favoritos;