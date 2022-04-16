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
      this.setState({ status: 'pending' });
      fetchImages(this.state.request, this.state.page)
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
    const { status, data, error, total, link } = this.state;
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
      </>
    );
  }
}
export default App;
