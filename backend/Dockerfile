FROM node:18-alpine3.17

COPY dist/app.js ./
COPY dist/config.prod.json ./config.json

RUN mkdir ./data
RUN echo '[]' >> ./data/feeds.json

RUN npm install pm2 -g

CMD ["pm2-runtime", "./app.js"]