////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// MIDDLEWARE PARA VERIFICAR QUE EL USUARIO QUE INTENTA EDITAR UNA NOTICIA ////////////
/////////////////////////// ES EL MISMO QUE EL QUE LA CREÓ /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const { getNewsByIdDB } = require('../../db/news');
const { generateError } = require('../helpers.js');

// verifica que el usuario que intenta editar una noticia es el mismo que el que la creó
const checkNewsOwnership = async (req, res, next) => {
  try {
    // obtiene el identificador de la noticia a partir de los parámetros de la ruta
    const { id } = req.params;

    // obtiene la noticia de la base de datos
    const newsData = await getNewsByIdDB(id);

    if (!newsData) {
      throw generateError(
        `No se encontró la noticia con id ${id} en la base de datos`,
        404
      );
    }

    // verifica que el usuario que creó la noticia es el mismo que el usuario autenticado
    if (newsData.user_id !== req.auth.id) {
      throw generateError('No tienes permiso para editar esta noticia', 401);
    }

    // si la verificación es exitosa, llama al siguiente middleware o a la ruta o controlador correspondiente
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { checkNewsOwnership };

// Este middleware tiene como propósito verificar que el usuario que intenta editar una noticia sea el mismo que el usuario que la creó.

// El código hace lo siguiente:

// Obtiene el identificador de la noticia a partir de los parámetros de la ruta.
// Obtiene la noticia de la base de datos utilizando la función getNewsByIdDB().
// Verifica si la noticia existe en la base de datos. Si no existe, se genera un error con un mensaje y un código HTTP 404.
// Verifica que el identificador del usuario que creó la noticia sea el mismo que el identificador del usuario autenticado que está haciendo la petición. Si no son iguales, se genera un error con un mensaje y un código HTTP 401.
// Si las verificaciones anteriores son exitosas, se llama al siguiente middleware o a la ruta o controlador correspondiente.
