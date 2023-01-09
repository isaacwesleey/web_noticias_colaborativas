# web_noticias_colaborativas

Inicializar entorno NodeJS:
`npm init -y / npm init`

Instalar las dependencias de produción:
`npm i dotenv express`

Instalar las dependencias de desarrollo:
`npm i eslint prettier nodemon morgan -D`

Inicializo eslint:
`npx eslint --init`

Inicializo prettier, .prettierrc.json:`
{
"trailingComma": "es5",
"tabWidth": 2,
"semi": true,
"singleQuote": true
}

Creo la scrip para arrancar el servidor con nodemon:
`"dev": "nodemon server.js"`
Arranco el servidor web con:
`npm run dev`

DESCRIPCIÓN
Implementar una API que permita gestionar noticias colaborativas, estilo reddit o menéame,
donde los usuarios puedan registrarse y publicar una noticia en una serie de categorías
temáticas fijas.

USUARIOS ANÓNIMOS
● Visualizar la lista de últimas noticias (listado con título, tema, entradilla y foto)
● Visualizar una única noticia completa
● Opcional:
○ Filtrado las noticias por tema
● Login (Email y Password)
● Registro:
○ Nombre
○ Email
○ Password
USUARIOS REGISTRADOS
● Lo mismo que los anónimos
● Publicar una nueva noticia:
○ Título
○ Foto (opcional)
○ Entradilla
○ Texto de la noticia
○ Tema
● Editar una noticia publicada por el mismo usuario
● Borrar una noticia publicada por el usuario
● Opcional
○ Gestión del perfil de usuario (Nombre, Email, Biografía, Foto, ...)
○ Votar positivamente o negativamente otras noticias

Entidades:

Usuario (con atributos como nombre, email, password, biografia y foto (Opcional))
Noticia (con atributos como título, foto, entradilla, texto y tema)

Relaciones:

Un usuario puede publicar muchas noticias (un usuario tiene muchas noticias)
Una noticia pertenece a un solo usuario (una noticia tiene un usuario)
Un usuario puede votar positivamente o negativamente muchas noticias (un usuario tiene muchas noticias votadas)
Una noticia puede ser votada por muchos usuarios (una noticia tiene muchos usuarios que la han votado)

API Endpoints:

Para visitantes (usuarios anónimos):

GET /noticias: Devuelve la lista de últimas noticias con título, tema, entradilla y foto.
GET /noticias/:id: Devuelve los detalles de una noticia específica con todos sus atributos.
POST /login: Permite a un usuario iniciar sesión con su email y password. ✅
POST /register: Permite a un usuario registrarse proporcionando su nombre, email y password. ✅

Para usuarios registrados:

POST /noticias: Permite a un usuario registrado publicar una nueva noticia con título, foto (opcional), entradilla, texto y tema. ✅
PUT /noticias/:id: Permite a un usuario registrado editar una noticia que haya publicado previamente.
DELETE /noticias/:id: Permite a un usuario registrado borrar una noticia que haya publicado previamente.
GET /usuarios/:id: Devuelve la información de un usuario especifico. ✅
