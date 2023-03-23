# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /app/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# das Docker Image kann mit dem Befehl gebaut werden
# docker build -t pathToRepository .

# Der Endpunkt in der Datei "websocket.service.ts" muss angepasst werden