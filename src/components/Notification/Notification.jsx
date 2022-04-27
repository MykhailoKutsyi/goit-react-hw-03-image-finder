import { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class Notification extends Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    dataLength: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { status, dataLength, total, page } = this.props;
    const prevStatus = prevProps.status;
    const nextStatus = this.props.status;

    if (prevStatus !== nextStatus) {
      status === 'resolved' &&
        page === 1 &&
        dataLength > 0 &&
        Notify.info(`Hooray! We found ${total} images.`);

      status === 'resolved' &&
        total === 0 &&
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );

      status === 'resolved' &&
        dataLength > 0 &&
        dataLength === total &&
        Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
    }
  }

  render() {
    return null;
  }
}
