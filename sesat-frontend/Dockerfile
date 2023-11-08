FROM node:alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# --

FROM node:alpine as production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]