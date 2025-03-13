# Étape 1 : Construction de l'application Angular
FROM node:18.19.1 AS build
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances avec NPM 9.2.0
RUN npm install -g npm@9.2.0 \
    && npm ci

# Copier le reste du code source et construire l'application Angular
COPY . .
RUN npm run build --prod

# Étape 2 : Exécution avec Nginx
FROM nginx:latest
WORKDIR /usr/share/nginx/html

# Supprimer les fichiers par défaut de Nginx
RUN rm -rf ./*

# Copier les fichiers générés dans le dossier "dist" d'Angular vers Nginx
COPY --from=build /app/dist/* ./

# Copier le fichier de configuration Nginx pour le Single Page Application (SPA)
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80 pour servir l'application
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
