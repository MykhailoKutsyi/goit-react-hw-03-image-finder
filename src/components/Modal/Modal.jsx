import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    link: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { link } = this.props;
    const { handleOverlayClick } = this;
    return createPortal(
      <div className={s.Overlay} onClick={handleOverlayClick}>
        <div className={s.Modal}>
          <img src={link} alt="Big illustration" />
        </div>
      </div>,
      document.body
    );
  }
}
