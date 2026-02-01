import axios from 'misc/requests';
import config from "../../config";

const createAuthor = (name) => {
  const { AUTHOR_SERVICE } = config;
  return axios.post(`${AUTHOR_SERVICE}`, { name });
};

const getAuthors = () => {
  const { AUTHOR_SERVICE } = config;
  return axios.get(`${AUTHOR_SERVICE}`);
};

const getOrCreateAuthor = async (authorName) => {
  try {
    const newAuthor = await createAuthor(authorName);
    return newAuthor.id;
  } catch (error) {
    const authors = await getAuthors();
    const existingAuthor = authors.find(
      (author) => author.name.toLowerCase() === authorName.toLowerCase()
    );

    if (existingAuthor) {
      return existingAuthor.id;
    }

    throw error;
  }
};

const exportFunctions = {
  createAuthor,
  getAuthors,
  getOrCreateAuthor
};


export default exportFunctions;