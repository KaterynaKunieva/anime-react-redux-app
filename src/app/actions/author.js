import axios from 'misc/requests';
import config from "../../config";

const createAuthor = (name) => {
  const { AUTHOR_SERVICE } = config;
  const data = axios.post(`${AUTHOR_SERVICE}`, { name });
  return data;
};

const getAuthors = () => {
  const { AUTHOR_SERVICE } = config;
  const data = axios.get(`${AUTHOR_SERVICE}`);
  return data;
};

const getOrCreateAuthor = async (authorName) => {
  return createAuthor(authorName)
    .then(author => {
      return author.id;
    })
    .catch((err) => {
      if (err.status === 409) { // exists
        return getAuthors()
          .then(authors => {
            const existingAuthor = authors.find(
              (author) => author.name.toLowerCase() === authorName.toLowerCase()
            );

            if (existingAuthor) {
              return existingAuthor.id;
            }
          })
      }
      throw err;
    })
};

const exportFunctions = {
  createAuthor,
  getAuthors,
  getOrCreateAuthor
};


export default exportFunctions;