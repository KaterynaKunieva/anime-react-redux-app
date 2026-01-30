FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG PUBLIC_URL
ARG REACT_APP_UI_URL_PREFIX
ARG REACT_APP_API_URL

ENV PUBLIC_URL=$PUBLIC_URL
ENV REACT_APP_UI_URL_PREFIX=$REACT_APP_UI_URL_PREFIX
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]