# Backend - Proyecto Final Módulo 3

Este es el backend desarrollado de forma individual para el proyecto final del Módulo 3 del bootcamp. Se trata de una API REST construida con **TypeScript, Express y TypeORM**, conectada a una base de datos PostgreSQL.

## 🚀 Scripts disponibles

### `npm run dev`

Inicia el servidor en modo desarrollo con `ts-node` y `nodemon`.

### `npm run build`

Compila el proyecto a JavaScript en la carpeta `dist`.

### `npm start`

Ejecuta la versión compilada del servidor desde `dist/index.js`.

## 📦 Tecnologías y dependencias

- **Express**: framework principal del servidor
- **TypeORM**: ORM para la base de datos PostgreSQL
- **bcrypt** y **jsonwebtoken**: para autenticación
- **dotenv**: manejo de variables de entorno
- **CORS**, **Morgan**: middleware
- **Nodemon**, **ts-node**, **TypeScript**: entorno de desarrollo

## 🧠 Funcionalidades

- Rutas RESTful para manejo de recursos (usuarios, productos, órdenes, etc.)
- Middleware de autenticación con JWT
- Encriptación de contraseñas con bcrypt
- Arquitectura modular y escalable

## ⚙️ Estructura del proyecto

src/
├── controllers/
├── entities/
├── middlewares/
├── routes/
├── services/
├── index.ts
└── ...
---

### 🟩 `README.md` para el **Frontend** (`/front`):

```markdown
# Frontend - Proyecto Final Módulo 3

Este es el frontend creado de forma individual para el proyecto final del Módulo 3 del bootcamp. Es una SPA construida con **React + Vite**, estilizada con `styled-components` y con formularios manejados con `Formik`.

## 🚀 Scripts disponibles

### `npm run dev`

Inicia el entorno de desarrollo en `http://localhost:5173`.

### `npm run build`

Genera una versión optimizada para producción.

### `npm run preview`

Ejecuta una vista previa del sitio compilado.

## 📦 Tecnologías utilizadas

- **React** + **Vite**
- **React Router DOM**: navegación entre vistas
- **Axios**: consumo de la API
- **Formik**: manejo de formularios
- **Styled-components**: estilos con CSS-in-JS
- **SweetAlert2**: modales y notificaciones

## 🧠 Funcionalidades implementadas

- Registro e inicio de sesión
- Validaciones de formularios
- Navegación por rutas protegidas según el rol
- Integración completa con el backend desarrollado

## 📁 Estructura del proyecto

src/
├── components/
├── views/
├── routes/
├── services/
├── App.jsx
└── main.jsx
