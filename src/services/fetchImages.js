export default function fetchImages(searchRequest, page) {
  const options = {
    key: '25968953-7e2042be61e43274ed33ea7fb',
    enteredValue: searchRequest,
    // enteredValue: 'ukraine',
    imageType: 'photo',
    orientation: 'horizontal',
    perPage: 12,
  };
  // console.log('page = ', page);
  const url = `https://pixabay.com/api/?key=${options.key}&q=${options.enteredValue}&image_type=${options.imageType}&orientation=${options.orientation}&per_page=${options.perPage}&page=${page}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Try to change the request`);
  });
}
