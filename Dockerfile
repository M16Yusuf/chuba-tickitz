FROM node:lts-alpine3.21 AS builder
# set working directory
WORKDIR /app
# copy file esensial untuk install dependency
COPY package.json package-lock.json ./
# install node-module dari package.json
RUN npm ci
# copy semua file
COPY . .

ARG VITE_DEV
ENV VITE_ENVIRONMENT=${VITE_DEV}

ARG VITE_HOST
ENV VITE_HOST_URL=${VITE_HOST}

# run script build vite
RUN npm run build
# stage 2: setup app
FROM nginx:stable-bookworm
# copy premade config
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/

COPY --from=builder /app/nginx/sites-available/app.conf /etc/nginx/sites-available/

COPY --from=builder /app/nginx/includes/proxy.conf /etc/nginx/includes/proxy.conf

# create symlink
RUN mkdir -p /etc/nginx/sites-enabled
# buat solflink 
RUN ln -s /etc/nginx/sites-available/app.conf /etc/nginx/sites-enabled

RUN mkdir -p /var/www/client
# copy dari builder ke lokasi aplikasi server
COPY --from=builder /app/dist /var/www/client
# buka port untuk akses nginx
EXPOSE 80
# jalankan nginx di foreground
CMD ["nginx", "-g", "daemon off;"]