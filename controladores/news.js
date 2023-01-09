const { generateError } = require('../helpers');
const { createNewsDB } = require('../db/news');

const news = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

const newNews = async (req, res, next) => {
  try {
    const { title, content, lede, theme } = req.body;

    if (!title || !content || !lede || !theme) {
      throw generateError('Faltan datos', 400);
    }
    await createNewsDB({
      title,
      content,
      lede,
      theme,
    });

    res.send({
      status: 'ok',
      message: 'Nueva noticia creada',
    });
  } catch (error) {
    next(error);
  }
};

const searchNews = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

const deleteNews = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  news,
  newNews,
  searchNews,
  deleteNews,
};
