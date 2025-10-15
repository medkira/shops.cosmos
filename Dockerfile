FROM node:20

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --production
COPY . .
RUN npm run build
RUN npx vite build

CMD ["npm", "run", "start:server"]