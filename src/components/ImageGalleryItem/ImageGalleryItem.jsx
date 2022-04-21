import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ item: { webLink, tags, link } }) => {
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

export default ImageGalleryItem;
