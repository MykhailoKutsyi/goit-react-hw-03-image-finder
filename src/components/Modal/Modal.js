import { createPortal } from 'react-dom';
import { Component } from 'react/cjs/react.production.min';

export class Modal extends Component {
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
      console.log(e.target);
      console.log(e.currentTarget);
      this.props.onClose();
    }
  };
  render() {
    console.log(this.props);

    return createPortal(
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          <img src={this.props.link} alt="12" />
        </div>
      </div>,
      document.body
    );
  }
}
