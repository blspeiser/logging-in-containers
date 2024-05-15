FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production 

RUN mkdir utils \
 && mkdir logs \
 && touch logs/out.log \
 && chmod 777 logs/out.log

COPY server.js ./
COPY utils/logger.js ./utils/

USER node
ENV PORT=80
EXPOSE 80
CMD ["/bin/ash", "-c", "node server.js"]
