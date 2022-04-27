import React, { Component } from 'react';

import fetchImages from './services/fetchImages';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import { Modal } from './components/Modal';
import Button from './components/Button';
import Loader from './components/Loader';
import { Notification } from './components/Notification';

class App extends Component {
  state = {
    request: '',
    data: [],
    total: 0,
    page: 1,
    status: 'idle',
    link: null,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.request;
    const nextName = this.state.request;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      const { request, page } = this.state;
      this.setState({ status: 'pending' });
      fetchImages(request, page)
        .then(newData => {
          return this.setState(({ data }) => ({
            data: [
              ...data,
              ...newData.hits.map(item => ({
                id: item.id,
                webLink: item.webformatURL,
                link: item.largeImageURL,
                tags: item.tags,
              })),
            ],
            total: newData.total,
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  onLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  addRequest = newRequest => {
    this.setState({
      data: [],
      request: newRequest,
      page: 1,
    });
  };

  addLink = newLink => {
    this.setState({
      link: newLink,
    });
  };

  deleteLink = () => {
    this.setState({ link: null });
  };

  render() {
    const { status, data, error, total, link, page } = this.state;
    const { addRequest, addLink, onLoadMoreClick, deleteLink } = this;

    return (
      <>
        <Searchbar onSubmit={addRequest} />

        {status === 'idle' && <></>}

        {data.length > 0 && <ImageGallery onSubmit={addLink} data={data} />}

        {status === 'rejected' && <>{error}</>}
        {status === 'resolved' && data.length > 0 && data.length < total && (
          <Button loadMore={onLoadMoreClick} />
        )}

        {status === 'pending' && <Loader />}

        {link && <Modal onClose={deleteLink} link={link} />}

        <Notification
          status={status}
          dataLength={data.length}
          total={total}
          page={page}
        />
      </>
    );
  }
}
export default App;
