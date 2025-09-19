import React, { Component } from 'react';
import Cards from '../../components/Cards/Cards';
import './styles.css'

class ResultadosB extends Component {
    constructor(props) {
        super(props);
        this.state = {
          resultados: [],
        };
      }
      componentDidMount() {
        const busqueda = this.props.match.params.busqueda;
        const tipo = this.props.match.params.tipo;
        fetch(`https://api.themoviedb.org/3/search/${tipo}?query=${busqueda}&api_key=04e6a27eeae7267e69af197c8db319ff`)
          .then(response => response.json())
          .then(data => {
            this.setState({ resultados: data.results });
          })
          .catch(error => console.log(error));
      }
  render() {
    const busqueda = this.props.match.params.busqueda;
    return (
        <main className='home'>
        <section className='grupo'>
          <h2>Resultados de su búsqueda: {busqueda}</h2>
          {this.state.resultados.length === 0 ? (
            <p>No se encontraron resultados.</p>
          ) : (
            <div className='grid'>
              {this.state.resultados.map((item) => (
                <Cards key={item.id} movie={item} />
              ))}
            </div>
          )}
        </section>
      </main>
    );
  }

}

export default ResultadosB;