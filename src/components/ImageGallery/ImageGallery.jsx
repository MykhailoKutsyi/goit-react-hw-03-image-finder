import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ data, onSubmit }) => {
  return (
    <>
      <ul
        className={s.ImageGallery}
        onClick={e =>
          onSubmit(e.target.attributes.getNamedItem('data-link').value)
        }
      >
        {data.map(item => (
          <ImageGalleryItem item={item} key={item.id} />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      webLink: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ImageGallery;
