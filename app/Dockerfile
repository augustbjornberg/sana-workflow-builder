FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS dev
# Ensure /app is writable for the non-root 'node' user in dev containers
RUN chown -R node:node /app
USER node
CMD ["npm", "run", "dev"]

FROM base AS prod
RUN npm run build
CMD ["npm", "run", "start"]