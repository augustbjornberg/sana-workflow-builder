FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS dev
RUN chown -R node:node /app
USER node
CMD ["npm", "run", "dev"]
