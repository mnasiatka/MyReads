export const defaultImageURL = 'http://via.placeholder.com/128x193?text=No%20Cover';
export const getBookImage = (book) => (book.imageLinks && book.imageLinks.thumbnail) || defaultImageURL;