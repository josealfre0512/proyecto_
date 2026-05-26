#NUevo proyecto

Este es el backend central desarrollado en Node.js, TypeScript y Express para la gestión, control y automatización de los cuatro tipos de formularios de proyectos del PNF en Informática. La persistencia de datos se realiza en una base de datos NoSQL (MongoDB Atlas).

---

## 🛠️ Requisitos Previos

Antes de inicializar el proyecto, asegúrese de tener instalado:
* Node.js (Versión v18 o superior)
* npm (Gestor de paquetes de Node)
* Una instancia o URI de MongoDB Atlas activa

---

## ⚙️ Variables de Entorno (.env)

Cree un archivo `.env` en la raíz del proyecto basándose en los siguientes parámetros:

```env
PORT=5000
MONGO_URI=tu_cadena_de_conexion_de_mongodb_atlas
JWT_SECRET=tu_clave_secreta_para_firmar_tokens
FRONTEND_URL=http://localhost:3000