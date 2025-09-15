import React, { Component } from 'react';
import './styles.css';

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  controlarInput = (e) => {
    this.setState({ query: e.target.value });
    // avisamos al padre cada vez que cambia
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  };

  controlarForm = (e) => {
    e.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.query);
    }
  };

  render() {
    return (
      <form onSubmit={this.controlarForm} className="buscador">
        <input
          type="text"
          placeholder="Buscar películas..."
          value={this.state.query}
          onChange={this.controlarInput}
        />
        <button type="submit">Buscar</button>
      </form>
    );
  }
}

export default Buscador;