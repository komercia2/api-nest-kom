##########################
# DEVELOPMENT ENVIRONMENT#
##########################

FROM node:18.12.1-alpine AS development

RUN npm install -g pnpm@8.6.5

ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY . .

RUN pnpm install --save

RUN pnpm run build

#########################
# PRODUCTION ENVIRONMENT#
#########################

FROM node:18.12.1-alpine AS production

RUN npm install -g pnpm@8.6.5

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN pnpm install --prod --ignore-scripts

COPY --from=development /app/dist ./dist

CMD [ "node", "dist/main.js" ]
