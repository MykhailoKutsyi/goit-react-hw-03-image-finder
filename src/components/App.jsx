import React, { Component } from 'react';
import Searchbar from './Searchbar'
import ImageGallery from './ImageGallery'
import { Modal } from './Modal';


class App extends Component {
  state = { request: '',showModal: false,link: null};

  addRequest = newRequest => {
    this.setState({
      request: newRequest,
    });
  }
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  changeLink = newLink => {
    this.toggleModal();
    this.setState({
      link: newLink,
    });
  }
  render() {
    console.log(this.state);
    console.log(this.state.showModal);
    return (
      <>
        {/* {((this.state.link !== null) && (this.state.showModal = true)) */}
        
        <Searchbar onSubmit={this.addRequest} />
        <ImageGallery searchRequest={this.state.request} link={ this.state.link} onSubmit={this.changeLink}/>
        {/* <Modal largeImageURL={largeImageURL} tags={tags} /> */}
        {this.state.showModal &&
          <Modal onClose={this.toggleModal} link={this.state.link} />
        }
      </>
    );
  };
}
export default App;