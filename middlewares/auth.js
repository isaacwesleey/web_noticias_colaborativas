'use strict;';

const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Middleware para comprobar si el usuario está autenticado /////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw generateError('No hay cabecera de autorización', 401);
    }
    let token;

    try {
      token = jwt.verify(authorization, process.env.JWT_SECRET);
    } catch (error) {
      throw generateError('El token no es válido', 401);
    }
    req.auth = token;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authUser };
