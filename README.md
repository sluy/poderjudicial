# Proyecto (laravel)
Para implementar sólo resta correr las dependencias regulares del proyecto como cualquier instalación de laravel.

Tecnologías usadas: Laravel 8.8 + MySQL 8.0 + QuasarFramework 2

## Sinopsis

Laravel está siendo usado como una API rest y posteriormente consumida con Quasar Framework (VueJS).

### Permisos

Los permisos como eran sólo dos tipos de usuario se usó un campo adicional en el modelo de los mismos (auth) para definir si es o no un administrador (boolean).

Las rutas protegidas para admin usan un Middleware creado para el caso llamado `is_admin`.

### Rutas
La estructura de las rutas y funcionamiento es simple dentro de todo:

#### Usuarios
- api/auth/login (post) : inicia sesión en el sistema devolviendo el usuario + credenciales oauth
- api/auth/signup (post): registra un nuevo usuario, require los parámetros `name`, `email`, `password`.
- api/auth/logout (get): cierra la sesión de un usuario.
- api/auth/user (get): devuelve la info del usuario actualmente autenticado.

#### Productos
Rutas protegidas para sólo administradores.

- api/products (get) : devuelve todos los productos del sistema.
- api/products (post): genera un nuevo producto. 
- api/products (put): actualiza un producto existente.
- api/products (delete): elimina un producto existente.

#### Compras
Rutas sólo disponibles para usuarios registrados.

- api/boughts/{id} (post): realiza la compra de un nuevo producto donde el `{id}` será el identificador del producto a comprar.


#### Facturas

- api/invoices (get): devuelve todas las facturas realizadas en el sistema.
- api/invoices/user/{id} (get): devuelve todas las facturas de un usuario con el `{id}` suministrado.
- api/invoices/{id} (get): devuelve la info detallada de una factura en particular.
- api/invoices (post): realiza el calculo y creación de facturas nuevas.


### Proceso de creación de nuevas facturas:

Al momento de comprar un producto, se creará un nuevo registro en la tabla `boughts` sin asociar a ninguna factura.

Cuando se activa el endpoint para la creación de facturas,el sistema verificará cuales compras no están asociadas a una factura. En caso de existir comenzará el proceso de la siguiente forma:

- Verifica el usuario asociado.
- Toma todas las compras no registradas en facturas anteriores y relacionadas directamente con dicho usuario.
- Hace el cálculo de el total de impuestos, total del precio y total de precio simple (sin incluir el impuesto) y los almacena para la factura.

Con este esquema podemos saber que se compró, cual fue su precio original, cuanto fue de impuestos y a su vez que "compras" están asociadas a dicha factura.


### Sobre el código

El código está comentado y tratando de implementar lo mejor posible DRY (salvo contadas excepciones por cosas de tiempo). A su vez relaciones entre explícitas de tablas (en bd, modelos) fueron dejadas de lado por motivos de velocidad.


# DOCKER

## Levantar las instancias:

```
docker-compose build app
docker-compose up -d
```

## Instalar dependencias de Laravel
```
docker-compose exec app composer install
docker-compose exec app npm install
docker-compose exec app php artisan key:generate
```
En el caso de un fresh install, inicializar la bd y el passport:

```
docker-compose exec app php artisan migrate
docker-compose exec app php artisan passport:install
```

### Instalar dependencias del Front (Quasar)
```
docker exec -it poderjudicial-app bash
cd front
npm install
```

## Importar la vista de Quasar hacia Laravel:
```
docker exec -it poderjudicial-app bash
cd front
quasar build
cd ..
npm run dev
```
## Correr el modo dev del front (Quasar)

```
docker exec -it poderjudicial-app bash
cd front
quasar dev
```

** Por defecto correrá en localhost:8888**



