////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// MIDDLEWARE PARA VERIFICAR QUE EL USUARIO QUE INTENTA EDITAR UNA NOTICIA ////////////
/////////////////////////// ES EL MISMO QUE EL QUE LA CREÓ /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const { getNewByIdDB } = require('../db/news');
const { generateError } = require('../helpers');

// verifica que el usuario que intenta editar una noticia es el mismo que el que la creó
const checkNewsOwnership = async (req, res, next) => {
  try {
    // obtiene el identificador de la noticia a partir de los parámetros de la ruta
    const { id } = req.params;

    // obtiene la noticia de la base de datos
    const news = await getNewByIdDB(id);

    if (!news) {
      throw generateError(`La noticia con id ${id} no existe`, 404);
    }

    // verifica que el usuario que creó la noticia es el mismo que el usuario autenticado
    if (news.user_id !== req.auth.id) {
      throw generateError('No tienes permiso para editar esta noticia', 401);
    }

    // si la verificación es exitosa, llama al siguiente middleware o a la ruta o controlador correspondiente
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { checkNewsOwnership };
