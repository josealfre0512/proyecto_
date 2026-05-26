# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-05-25
### Added
- Inicialización del entorno con Node.js, Express, TypeScript y Mongoose.
- Modelo de Usuario con hashing de contraseñas mediante `bcryptjs`.
- Sistema de autenticación seguro basado en JWT (`/api/auth/register` y `/api/auth/login`).
- Middleware de restricción de rutas y protección de endpoints mediante Bearer Tokens.
- Modelado polimórfico para los 4 formularios de proyectos del PNF en Informática.
- Esquemas de validación estructural dinámicos y seguros basados en Zod.
- Configuración avanzada de CORS enlazada con la variable `FRONTEND_URL` para Next.js.
- Middleware de control global de excepciones y formateo de respuestas de error.
- Archivo automatizado de pruebas de endpoints `pruebas.http`.
- Documentación técnica exhaustiva con contratos de API en el `README.md`.