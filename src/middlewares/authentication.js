// Middleware de autenticación: Este middleware se encargará de verificar que el usuario que hace la petición está autenticado.

// Se verifica si existe una cabecera de autorización y se valida si el token JWT es válido. Si es válido,
// se agrega la información del usuario autenticado a la solicitud (req) y se llama al siguiente middleware
// o a la ruta correspondiente. Si no es válido, se genera un error 401 (No autorizado).

'use strict';

const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');

const authUser = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(generateError('No hay cabecera de autorización', 401));
  }

  try {
    const token = await jwt.verify(authorization, process.env.JWT_SECRET);
    req.auth = token;
    next();
  } catch (error) {
    next(generateError('El token no es válido', 401));
  }
};

module.exports = { authUser };
