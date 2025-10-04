# Accounts Management Service

Este proyecto es un servicio backend construido con [NestJS](https://nestjs.com/) para la administración de cuentas de usuario. Proporciona una API robusta y escalable para operaciones relacionadas con cuentas, como creación, consulta, actualización y eliminación de usuarios, así como la gestión de roles y permisos. Está diseñado para ser fácilmente integrable con otros sistemas de una arquitectura empresarial.

## Características principales
- API RESTful para la gestión de cuentas de usuarios.
- Arquitectura modular usando NestJS y TypeScript.
- Soporte para autenticación y autorización (según la implementación del proyecto).
- Pruebas unitarias y de extremo a extremo.

## Requisitos previos
- [Node.js](https://nodejs.org/) >= 18.x
- [npm](https://www.npmjs.com/) >= 9.x

## Instalación

Clona este repositorio y accede a la carpeta del proyecto.

### 1. Levanta la base de datos

Asegúrate de tener Docker instalado. Luego ejecuta:

```bash
docker compose up -d
```

Este comando levantará dos bases de datos Postgres:
- Una base de datos principal para el funcionamiento de la aplicación.
- Una base de datos separada utilizada exclusivamente para los tests de integración y end-to-end.

De esta manera la base de datos de pruebas no afecta tus datos de desarrollo y la aplicación puede ser testeada en un entorno aislado.

### 2. Configura tus variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las variables necesarias. Puedes basarte en un posible archivo `.env.example` o solicitar los valores requeridos a tu equipo.

Ejemplo de `.env`:

```env
# Server Port
PORT=3000
# Postgres DB
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=bank-store
POSTGRES_DATABASE=bank-store
POSTGRES_PASSWORD=bank-store
POSTGRES_LOGGING_ORM=false
#Jwt
JWT_SECRET=my-secret-key
```

### 3. Instala dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias para ejecutar la aplicación.

### 4. Ejecuta las migraciones de la base de datos

Antes de iniciar la aplicación o ejecutar pruebas, debes aplicar las migraciones de TypeORM a ambas bases de datos:

Para la base de datos principal de la aplicación:
```bash
npm run typeorm:dev:run-migrations
```

Para la base de datos de pruebas (integración y e2e):
```bash
npm run test:run-migrations
```

## Ejecución local

Asegúrate de que los servicios de base de datos estén corriendo vía Docker y que tienes el archivo `.env` configurado antes de iniciar la app.

Puedes ejecutar la aplicación en modo desarrollo o producción con los siguientes comandos:

```bash
# Modo desarrollo (auto-reload)
npm run start:dev

# Modo producción
npm run start:prod

# Modo simple
npm run start
```

Por defecto, el servidor escuchará en `http://localhost:3000`.

## Pruebas

Puedes ejecutar las pruebas de la siguiente manera:

```bash
# Pruebas unitarias
npm run test

# Pruebas end-to-end (e2e)
npm run test:e2e

# Cobertura de pruebas
npm run test:cov
```

## Scripts útiles
- `npm run lint`: Verifica el estilo de código y errores de linting.
- `npm run build`: Compila el proyecto a JavaScript.

## Recursos adicionales
- [Documentación oficial de NestJS](https://docs.nestjs.com/)

## Licencia

MIT
