FROM php:7.4-fpm

# Argumentos definidos en docker-compose.yml
ARG user
ARG uid

# Instalar las dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm

# Limpiar Caché
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar extensiones necesaria de PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Obtener el último Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Instalar Vue & Quasar
RUN npm install -g @vue/cli @quasar/cli --unsafe-perm=true --allow-root

# Establecer el directorio de trabajo
WORKDIR /var/www

USER $user

