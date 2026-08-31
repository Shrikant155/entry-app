FROM node:18-alpine
WORKDIR /app/
COPY package*.json ./
RUN npm install --production
COPY . .
ENTRYPOINT ["node"]
CMD ["server.js"]
