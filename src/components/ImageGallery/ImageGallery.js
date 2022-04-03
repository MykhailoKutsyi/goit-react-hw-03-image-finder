import React, { Component } from 'react';
import fetchImages from './fetchImages';
// import axios from 'axios';
// const axios = require('axios');
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';

import Loader from 'components/Loader';
// import Modal from 'components/Modal';

class ImageGallery extends Component {
  state = { data: [], page: 1, status: 'idle' };
  pendingStatus = false;

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchRequest;
    const nextName = this.props.searchRequest;
    // console.log('prevName', prevName);
    // console.log(nextName);
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    // console.log('prevPage', prevPage);
    // console.log(nextPage);

    if (prevName !== nextName || prevPage !== nextPage) {
      console.log('componentDidUpdate');

      fetchImages(this.props.searchRequest, this.state.page)
        .then(newData => {
          return (
            (this.pendingStatus = false),
            this.setState(({ data }) => ({
              data: [...data, ...newData.hits],
              status: 'resolved',
            }))
          );
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  onLoadMoreClick() {
    // disabled
    // this.setState({ status: 'pending' });
    this.pendingStatus = true;
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    // console.log(this.state.page);
  }
  imageClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    // console.log(e);
    // console.log(e.target.dataset);
    // console.log(e.target.attributes.getNamedItem('data-tag').value);
    // console.log(this.props.bigIMG);
    this.props.onSubmit(e.target.attributes.getNamedItem('data-tag').value);

    // onClick(Number(e.target.dataset.id));
  };

  render() {
    const { status, data } = this.state;
    if (status === 'idle') {
      console.log('idle status');
      return <></>;
    }

    if (status === 'rejected') {
      console.log('rejected status');
      return <></>;
    }
    if (status === 'resolved') {
      console.log('resolved status');

      return (
        <>
          <ul className="ImageGallery" onClick={this.imageClick}>
            {data.map(item => (
              <ImageGalleryItem item={item} key={item.id} />
            ))}
            {/* {data.map(item => ( */}
            {/* <Modal item={item} /> */}
            {/* ))} */}
          </ul>
          {this.pendingStatus === false && (
            <Button loadMore={() => this.onLoadMoreClick()} />
          )}
          <Loader pendingStatus={this.pendingStatus} />
        </>
      );
    }
  }
}

export default ImageGallery;
