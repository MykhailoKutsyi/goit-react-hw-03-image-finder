// import { Modal } from 'components/Modal';

// export default ImageGalleryItem = element => {
const ImageGalleryItem = ({
  item: { webformatURL: webLink, tags, largeImageURL },
}) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={webLink}
        alt={tags}
        data-tag={largeImageURL}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};
export default ImageGalleryItem;
