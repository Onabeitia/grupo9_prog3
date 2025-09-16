import React, { Component } from 'react';
import Cards from '../../components/Cards/Cards';
import './style.css';

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: [],
      cargando: true
    };
  }
  componentDidMount() {
    const favoritosArray = localStorage.getItem('favorito');
    const favoritos = favoritosArray ? JSON.parse(favoritosArray) : [];
    this.setState({ favoritos });
  }
  render() {
    const { favoritos } = this.state;
    return (
      <main className="favoritos">
        <h1>Películas Favoritas</h1>
        <div className="grid">
          {favoritos.length === 0 ? (
            <p>No tenés favoritos todavía.</p>
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