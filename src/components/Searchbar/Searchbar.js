import React, { Component } from 'react';
import { nanoid } from 'nanoid';

class Searchbar extends Component {
  state = { request: '' };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { request } = this.state;
    this.props.onSubmit(request);
    this.reset();
  };

  reset = () => {
    this.setState({ request: '' });
  };

  nameId = nanoid();

  render() {
    return (
      <>
        <header className="Searchbar">
          <form onSubmit={this.handleSubmit} className="SearchForm">
            <button type="submit" className="SearchForm-button">
              <span className="button-label"></span>
            </button>

            <label htmlFor={this.nameId}>
              <input
                type="text"
                // autoComplete="off"
                name="request"
                value={this.state.request}
                onChange={this.handleChange}
                id={this.nameId}
                autoFocus
                placeholder="Search images and photos"
                className="SearchForm-input"
                //   required
              />
            </label>
          </form>
        </header>
      </>
    );
  }
}
export default Searchbar;
