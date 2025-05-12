FROM node:18.12.1-alpine AS builder

RUN npm install -g pnpm@8.6.5

WORKDIR /app

COPY . .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN pnpm install

RUN pnpm run build

FROM node:18.12.1-alpine AS production

RUN npm install -g pnpm@8.6.5

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --ignore-scripts

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main.js"]
