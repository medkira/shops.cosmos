FROM node:20

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --production
COPY . .
RUN npx vite build --emptyOutDir
RUN npm run build

CMD ["npm", "run", "start:server"]

# CMD ["npx", "vite"]