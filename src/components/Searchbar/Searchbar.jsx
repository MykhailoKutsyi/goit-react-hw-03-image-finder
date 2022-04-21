import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };

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
    const { request } = this.state;
    const { nameId, handleChange, handleSubmit } = this;
    return (
      <>
        <header className={s.Searchbar}>
          <form onSubmit={handleSubmit} className={s.SearchForm}>
            <button type="submit" className={s.SearchFormButton}>
              <span className={s.SearchFormButtonLabel}></span>
            </button>

            <label htmlFor={nameId}>
              <input
                type="text"
                autoComplete="off"
                name="request"
                value={request}
                onChange={handleChange}
                id={nameId}
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
