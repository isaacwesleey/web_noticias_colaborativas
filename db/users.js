////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Funciones para la gestión de usuarios en la base de datos ////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const bcrypt = require('bcrypt');
const { generateError } = require('../src/helpers');
const { getConnection } = require('./db');

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// Login ///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

const getUserByEmail = async (email) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    if (result.length === 0) {
      throw generateError(`Datos incorrectos`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// Informacion del Usuario //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

const infoUserDB = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT id, email, name FROM users WHERE id = ?`,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`Usuario no encontrado`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// Crear Usuario ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

const createUserDB = async (email, password, name) => {
  let connection;

  try {
    connection = await getConnection();
    const [user] = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    if (user.length > 0) {
      throw generateError(`Ya existe un usuario con email ${email}`, 409);
    }

    // Encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Guardar el usuario en la base de datos
    const [newUser] = await connection.query(
      `INSERT INTO users (email, password, name) VALUES (?, ?, ?)`,
      [email, passwordHash, name]
    );

    // Devolver el id del usuario
    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// Editar Usuario //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

const editUserDB = async (id, email, name) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `UPDATE users SET email = ?, name = ? WHERE id = ?`,
      [email, name, id]
    );

    if (result.affectedRows === 0) {
      throw new Error(`User not found`);
    }

    return result;
  } catch (error) {
    throw new Error(`Error updating user information: ${error.message}`);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { createUserDB, infoUserDB, getUserByEmail, editUserDB };
