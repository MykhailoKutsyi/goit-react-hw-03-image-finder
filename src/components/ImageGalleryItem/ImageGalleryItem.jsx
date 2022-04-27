import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ item: { webLink, tags, link } }) => (
  <li className={s.ImageGalleryItem}>
    <img
      src={webLink}
      alt={tags}
      data-link={link}
      className={s.ImageGalleryItemImage}
    />
  </li>
);
ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webLink: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
