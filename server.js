////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// Archivo principal del servidor, donde se ejecuta el servidor ////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const {
  news,
  newNews,
  deleteNews,
  newById,
  editNews,
} = require('./controladores/news');

const {
  createUser,
  infoUser,
  loginUser,
  editUser,
} = require('./controladores/users');

const { authUser } = require('./middlewares/auth');
const { checkNewsOwnership } = require('./middlewares/verify');

const { PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// Rutas ///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// Rutas de usuarios
app.post('/user', createUser); // crear usuario
app.get('/user/:id', authUser, infoUser); // info usuario
app.post('/login', loginUser); // login usuario
app.patch('/user/:id', authUser, editUser); // editar usuario

// Rutas de noticias
app.post('/', authUser, newNews); // crear noticia
app.get('/', news); // últimas noticias
app.get('/new/:id', newById); // info noticia
app.patch('/new/:id', authUser, checkNewsOwnership, editNews); // editar noticia
app.delete('/new/:id', authUser, checkNewsOwnership, deleteNews); // borrar noticia

// middleware de los errores
app.use((error, req, res, next) => {
  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

// middleware 404, endpoint no encontrado
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://127.0.0.1:${PORT}`);
});
