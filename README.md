# Sana Labs — Design Engineer Case

This repository contains my implementation for the Sana Labs Design Engineer technical assessment.

Tech stack: Next.js, TypeScript, Docker, Storybook, Radix UI.

## Requirements

- Docker + Docker Compose 

## Development

Start the dev environment:

```bash
docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up --build
```

App: [http://localhost:3000](http://localhost:3000)  
Storybook: [http://localhost:6006](http://localhost:6006)

## Production

Build for production:

```bash
docker compose -f docker-compose.yaml -f docker-compose.prod.yaml up --build
```

