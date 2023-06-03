FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build

ENV HTTPS=true
ENV SSL_CRT_FILE=/etc/letsencrypt/live/yogsstats.com/fullchain.pem
ENV SSL_KEY_FILE=/etc/letsencrypt/live/yogsstats.com/privkey.pem

EXPOSE 3000

CMD npm run build