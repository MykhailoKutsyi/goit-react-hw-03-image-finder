import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { Modal } from './Modal';

import fetchImages from './HTTP/fetchImages';
import Button from './Button';
import Loader from './Loader';

class App extends Component {
  state = {
    request: '',
    data: [],
    total: 0,
    page: 0,
    status: 'idle',
    showModal: false,
    link: null,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.request;
    const nextName = this.state.request;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      fetchImages(this.state.request, this.state.page)
        .then(newData => {
          return this.setState(({ data }) => ({
            data: [...data, ...newData.hits],
            total: newData.total,
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  onLoadMoreClick() {
    this.setState({ status: 'pending' });
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }

  addRequest = newRequest => {
    this.setState({
      data: [],
      request: newRequest,
      page: 1,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  changeLink = newLink => {
    this.toggleModal();
    this.setState({
      link: newLink,
    });
  };

  render() {
    const { status, data, error, total } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.addRequest} />

        {status === 'idle' && <></>}

        {data.length > 0 && (
          <ImageGallery onSubmit={this.changeLink} data={data} />
        )}

        {status === 'rejected' && <>{error}</>}

        {status === 'resolved' && data.length > 0 && data.length < total && (
          <Button loadMore={() => this.onLoadMoreClick()} />
        )}

        {status === 'pending' && <Loader />}

        {this.state.showModal && (
          <Modal onClose={this.toggleModal} link={this.state.link} />
        )}
      </>
    );
  }
}
export default App;
