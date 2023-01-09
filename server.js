require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const {
  news,
  newNews,
  searchNews,
  deleteNews,
} = require('./controladores/news');

const {
  createUser,
  infoUser,
  loginUser,
  editUser,
} = require('./controladores/users');

const { authUser } = require('./middlewares/auth');

const { PORT } = process.env;

const app = express();

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
app.post('/', authUser, newNews);
app.get('/', news);
app.get('/noticias/:id', searchNews);
app.delete('/noticias/:id', authUser, deleteNews);

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
