# Sana Labs — Design Engineer Case

This repository contains my implementation for the Sana Labs Design Engineer technical assessment.

Tech stack: Next.js, TypeScript, Radix UI, styled-components, Docker.

## Requirements

- Node 20+
- npm
- (optional) Docker and Docker Compose

## Running locally without Docker

```bash
cd app
npm install

# Development
npm run dev

# Production
npm run build
npm run start
```

App runs at: localhost:3000

## Running with Docker

### Development
```bash
docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up --build
```

App runs at: localhost:3000

### Production
```bash
docker compose -f docker-compose.yaml -f docker-compose.prod.yaml up --build
```

## Scripts

- `npm run dev` – start local development with Turbopack  
- `npm run build` – build the Next.js app  
- `npm run start` – start the production server  
- `npm run lint` – run ESLint  
- `npm run typecheck` – run TypeScript type checks  

## Notes

- Storybook was included in the setup but not implemented due to time constraints.  
- No environment variables are required for this version.  
- Built using multi-stage Dockerfiles for clean dev and prod environments.
