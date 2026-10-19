# NestJS Distributed Reservation & Auth Microservice

A distributed, monorepo-based backend architecture demonstrating microservice separation, inter-service authentication, and containerized deployment with NestJS and MongoDB.

---

## Architecture Overview

The system is built as a modular monorepo containing decoupled services communicating over internal transport layers:

```
                      ┌──────────────────────┐
                      │   Client Requests    │
                      └──────────┬───────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 │                               │
                 ▼                               ▼
       ┌──────────────────┐             ┌──────────────────┐
       │   Auth Service   │             │   Reservations   │
       │   (Port 3001)    │             │   (Port 3000)    │
       └────────┬─────────┘             └────────┬─────────┘
                │                                │
                │  ◄─────── TCP / RPC ────────►  │
                │     (Token Verification)       │
                ▼                                ▼
       ┌──────────────────┐             ┌──────────────────┐
       │   MongoDB Auth   │             │  MongoDB ResDB   │
       └──────────────────┘             └──────────────────┘
```

### Core Services:
1. **apps/auth**: Handles user registration, bcrypt credential hashing, and JWT token issuance. Acts as the auth authority for other services via microservice transport.
2. **apps/reservations**: Domain service managing booking lifecycle, availability checks, and reservation state.
3. **libs/common**: Reusable shared modules including database abstraction (DatabaseModule), config loading, and logging filters.

---

## Tech Stack & Patterns

- Framework: NestJS (TypeScript, Monorepo structure via nest-cli)
- Database: MongoDB via @nestjs/mongoose with custom repository abstractions
- Authentication: Stateless JWT + Passport strategies
- Inter-Service Communication: @nestjs/microservices (TCP transport)
- Environment Management: @nestjs/config with strict validation schemas
- Containerization: Multi-stage Dockerfiles and docker-compose.yaml
- Package Manager: pnpm workspace

---

## Getting Started

### Prerequisites
- Node.js >= 18
- Docker & Docker Compose
- pnpm

### Running with Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/Divy001/reservations-sleepr.git
cd reservations-sleepr
```

2. Start all microservices and databases:
```bash
docker-compose up --build
```

3. The services will be accessible at:
- Reservations API: http://localhost:3000
- Auth Service: http://localhost:3001

### Running Locally for Development

1. Install dependencies:
```bash
pnpm install
```

2. Run Auth service:
```bash
pnpm run start:dev auth
```

3. Run Reservations service in a separate terminal:
```bash
pnpm run start:dev reservations
```

---

## Testing

```bash
# Run unit tests across all monorepo apps
pnpm run test

# Run end-to-end tests
pnpm run test:e2e
```

---

## 📐 Engineering Highlights

- Shared Repository Pattern: Common database connection and CRUD methods isolated inside libs/common/src/database to eliminate boilerplate code across services.
- Fail-fast Environment Validation: Services do not start if critical environment secrets (JWT_SECRET, MONGODB_URI) are missing at startup.
- Microservice Isolation: Domain database logic is kept isolated per service, preventing cross-domain schema coupling.
