# Proyecto (laravel)
Para implementar sólo resta correr las dependencias regulares del proyecto como cualquier instalación de laravel (composer install, la instalación de migraciones, passport, etc).

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

### Notas adicionales

- El sistema está funcionando, sin embargo la zona de registro de usuarios no pudo ser probada (daba mas de 10 mins cargando por el tema del bug windows + docker); teóricamente debiera funcionar.
- El CRUD de productos no está en el front, de lo que entendí en las instrucciones es que el crud debería de existir en la parte lógica y funcional pero en los puntos por hacer decia que el panel de "admin" sólo involucraría un botón para crear nuevas facturas y el listado de las existentes.
- La url/puerto usado en la instalación de laravel fue localhost y 8000.
- En el front el inicio de sesión no se está almacenando en sessionstorage o localstorage, es algo meramente volátil con variables (para optimizar tiempo, que había perdido mucho con el S.O).
- Las validaciones están en back, en el front no usé librerías de validación por mismo tema tiempo.
- Acabo de editar sólo el readme anexando esta información y eliminando la relativa a docker (era sólo para guíarme de lo que estaba haciendo). 
