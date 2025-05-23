FROM node:18 AS builder

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install 
COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
