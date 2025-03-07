# Étape 1 : Build Angular
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Étape 2 : Serveur Nginx pour Angular
FROM nginx:latest
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/frontend /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
