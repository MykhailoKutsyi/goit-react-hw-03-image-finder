import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
const ImageGalleryItem = ({
  item: { webformatURL: webLink, tags, largeImageURL: link },
}) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webLink}
        alt={tags}
        data-link={link}
        className={s.ImageGalleryItemImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ImageGalleryItem;
