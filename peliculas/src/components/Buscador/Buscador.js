import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.css';

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: '',
      tipo: ''
    };

  }

  controlarForm = (buscado) => {
    buscado.preventDefault();
    this.props.history.push('/resultadosb/' + this.state.busqueda + "/" + this.state.tipo);
  };

  controlarInput = (buscado) => {
    this.setState({ busqueda: buscado.target.value });
  };

  controlarSP = (buscado) => {
    this.setState({ tipo: buscado.target.value });

  };


  render() {
    return (
      <form onSubmit={this.controlarForm} className="search-form">
        <input onChange={this.controlarInput} type="text" placeholder="Buscar…" value={this.state.busqueda} name="buscador" />
        <label>Peliculas</label>
        <input onChange={this.controlarSP} type="radio" name="type" value="movie" />
        <label>Series</label>
        <input onChange={this.controlarSP} type="radio" name="type" value="tv" />
        <button type="submit" className="busqueda">Buscar</button>
      </form>
    );
  }
}

export default withRouter(Buscador);