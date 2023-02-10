////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Funciones para el controlador de usuarios ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');
const { createUserDB, infoUserDB, getUserByEmail } = require('../../db/users');
const { editUserDB } = require('../../db/users');

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// Crear Usuario ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      throw generateError('Faltan campos', 400);
    }

    const id = await createUserDB(email, password, name);
    console.log(id);

    res.send({
      status: 'ok',
      message: `Usuario creado con id ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// Información del Usuario //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

const infoUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await infoUserDB(id);

    // El usuario solo puede ver su propia información (no la de otros usuarios)

    if (req.auth.id !== Number(id)) {
      throw generateError('No tienes permisos para ver esta información', 403);
    }

    res.status(200).send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// Login ///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError('Faltan campos', 400);
    }

    const user = await getUserByEmail(email);

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw generateError('Datos incorrectos', 401);
    }

    const payload = { id: user.id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.send({
      status: 'ok',
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// Editar Usuario //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

const editUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error('Missing fields');
    }
    console.log(req.auth.id);
    console.log(Number(id));
    // El usuario solo puede editar su propia información
    if (req.auth.id !== Number(id)) {
      throw new Error('Unauthorized access');
    }

    const user = await editUserDB(id, name, email, password);

    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Funciones Exportadas ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  createUser,
  editUser,
  infoUser,
  loginUser,
};
