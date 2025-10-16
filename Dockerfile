FROM node:22

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install --production

COPY . .
RUN npm run build

CMD ["npm", "run", "start:server"]
