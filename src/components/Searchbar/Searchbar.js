import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = { request: '' };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { request } = this.state;
    this.props.onSubmit(request.toLowerCase());
    this.reset();
  };

  reset = () => {
    this.setState({ request: '' });
  };

  nameId = nanoid();

  render() {
    return (
      <>
        <header className={s.Searchbar}>
          <form onSubmit={this.handleSubmit} className={s.SearchForm}>
            <button type="submit" className={s.SearchFormButton}>
              <span className={s.SearchFormButtonLabel}></span>
            </button>

            <label htmlFor={this.nameId}>
              <input
                type="text"
                autoComplete="off"
                name="request"
                value={this.state.request}
                onChange={this.handleChange}
                id={this.nameId}
                autoFocus
                placeholder="Search images and photos"
                className={s.SearchFormInput}
                required
              />
            </label>
          </form>
        </header>
      </>
    );
  }
}

export default Searchbar;
