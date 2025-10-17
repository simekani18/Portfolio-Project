# Portfolio Website - Full-Stack Application

A modern, production-ready portfolio website showcasing professional experience, skills, and projects. Built with a React TypeScript frontend and ASP.NET Core 8 backend API, featuring a comprehensive admin dashboard for content management.

## Project Purpose

This project serves as my **living CV** - a dynamic portfolio website that I can update in real-time through an admin portal without touching code. Instead of manually editing HTML/React files every time I gain new experience or complete a new project, I built a full-stack system where I can:

- ✅ Log into an admin dashboard
- ✅ Add/edit/delete work experiences through a CRUD interface
- ✅ Manage my professional profile information
- 🚧 Add new skills, projects, and blog posts (API in progress)
- 🚧 Upload images and media files
- 🚧 Update content dynamically without redeploying

**Current Status**: The backend API is fully functional with OAuth 2.0 authentication and experiences management. The **frontend portfolio section is currently hard-coded** with static data from `constants/` files, but the **admin dashboard is fully integrated** with the API for managing experiences.

**Migration Plan**: Once all remaining API endpoints (Skills, Projects, Blog) are completed, the public-facing portfolio will be migrated to fetch data from the API, making the entire site dynamically updatable through the admin portal.

## Table of Contents

- [Project Purpose](#project-purpose)
- [Architecture Philosophy](#architecture-philosophy)
- [Architecture Deep Dive](#architecture-deep-dive)
- [Frontend Migration Status](#frontend-migration-status)
- [Authentication System](#authentication-system)
- [Technology Stack](#technology-stack)
- [Outstanding Features](#outstanding-features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Docker Deployment](#docker-deployment)
- [API Documentation](#api-documentation)
- [Development Workflow](#development-workflow)

---

## Architecture Philosophy

### Vertical Slice Architecture (Backend)

This project employs **Vertical Slice Architecture** as popularized by Milan Jovanović, instead of the traditional Clean Architecture/Layered Architecture approach.

#### Why Vertical Slice?

While I have extensive experience with Clean Architecture and traditional layered approaches, this project was an intentional experiment to explore a less conventional but increasingly popular architecture pattern. **The results have been surprisingly positive.**

#### Benefits Observed (Milan's Principles)

1. **High Cohesion**: Each feature is completely self-contained with all its dependencies
2. **Low Coupling**: Features don't depend on each other, only on shared infrastructure
3. **Discoverability**: Finding feature code is trivial - everything for `Login` is in `Features/Auth/Login/`
4. **Reduced Cognitive Load**: You only need to understand one vertical slice at a time
5. **Feature-First Thinking**: Business requirements map directly to code structure
6. **Independent Scaling**: Features can evolve independently without affecting others

#### Traditional vs Vertical Slice

**Traditional Layered Architecture:**
```
Controllers/
  AuthController.cs
Services/
  AuthService.cs
  IAuthService.cs
Repositories/
  UserRepository.cs
  IUserRepository.cs
Models/
  LoginRequest.cs
  LoginResponse.cs
Validators/
  LoginValidator.cs
```

**Vertical Slice Architecture (This Project):**
```
Features/
  Auth/
    Login/
      Login.Command.cs      # MediatR command
      Login.Request.cs      # HTTP DTO
      Login.Response.cs     # HTTP DTO
      Login.Handler.cs      # Business logic
      Login.Endpoint.cs     # Route mapping
      Login.Validator.cs    # Validation rules
    Logout/
      Logout.Command.cs
      Logout.Response.cs
      Logout.Handler.cs
      Logout.Endpoint.cs
```

**Key Difference**: Everything related to "Login" lives together. No jumping between layers.

#### Pattern Consistency

Each feature follows a consistent structure:
- **Request**: External HTTP contract (API input)
- **Command/Query**: Internal application message (MediatR)
- **Response**: External HTTP contract (API output)
- **Handler**: Business logic implementation (IRequestHandler)
- **Endpoint**: Route mapping and HTTP plumbing (IEndpoint)
- **Validator**: FluentValidation rules

This isn't redundancy - it's **separation of concerns at the feature level**.

---

## Architecture Deep Dive

### Vertical Slice Architecture Explained

Each feature is a **vertical slice** through all layers of the application:

```
HTTP Request
    ↓
Endpoint (Login.Endpoint.cs)
    ↓
Validation (Login.Validator.cs)
    ↓
MediatR Pipeline
    ↓
Handler (Login.Handler.cs)
    ├─ Database Access (EF Core)
    ├─ Business Logic
    └─ External Services
    ↓
Response (Login.Response.cs)
    ↓
HTTP Response
```

### Benefits in Practice

**Example: Adding a New Feature**

To add a "Password Reset" feature:

1. Create folder: `Features/Auth/PasswordReset/`
2. Add files:
   - `PasswordReset.Command.cs`
   - `PasswordReset.Request.cs`
   - `PasswordReset.Response.cs`
   - `PasswordReset.Handler.cs`
   - `PasswordReset.Endpoint.cs`
   - `PasswordReset.Validator.cs`
3. Register endpoint in `EndpointExtensions.cs`

**That's it.** No touching other features, no updating multiple layers.

### Comparison with Clean Architecture

**What I've Learned:**

- **Clean Architecture**: Better for large teams with strict boundaries, complex business rules requiring heavy abstraction
- **Vertical Slice**: Better for small-to-medium teams, rapid feature development, clear feature ownership

**This project proved**: Vertical Slice Architecture is **not a compromise** - it's a legitimate, production-ready approach that reduces ceremony while maintaining testability and separation of concerns.

### MediatR Pipeline

The project uses **MediatR** to decouple request handling:

```csharp
// Endpoint
var command = new Command(request.Username, request.Password);
var response = await mediator.Send(command);

// MediatR routes to Handler
public class Handler : IRequestHandler<Command, Response>
{
    public async Task<Response> Handle(Command request, CancellationToken ct)
    {
        // Business logic here
    }
}
```

This provides:
- **Testability**: Handlers are easy to unit test
- **Pipeline Behaviors**: Cross-cutting concerns (logging, validation)
- **Decoupling**: Endpoints don't know about implementation

### Shared Infrastructure

While features are independent, they share:

- **Database Context**: `PortfolioDbContext`
- **Authentication**: JWT configuration in `ServiceCollectionExtensions`
- **Middleware**: Exception handling, CORS, token blacklist
- **Common Contracts**: `IEndpoint`, `Result<T>`

This is the **sweet spot**: Features are independent where it matters, but share infrastructure to avoid duplication.

---

## Frontend Migration Status

The frontend is currently in a **transitional state** between static and fully dynamic:

### ✅ Fully Integrated with API

- **Admin Dashboard** (`/admin/*`)
  - Login/Logout with OAuth 2.0 authentication
  - Experiences management (CRUD operations)
  - Real-time data from backend API
  - Token-based authentication for protected routes

### 🚧 Currently Hard-Coded (Temporary)

The **public-facing portfolio** currently uses static data from `constants/` files:

- **Work Experiences** (`frontend/src/constants/experiences.ts`)
- **Technical Skills** (`frontend/src/constants/skills.ts`)
- **Navigation** (`frontend/src/constants/navigation.ts`)
- **Contact Options** (`frontend/src/constants/contactOptions.ts`)

### 📋 Migration Roadmap

Once the following API endpoints are completed, the frontend will be migrated to fetch data dynamically:

1. **Skills API** → Replace `constants/skills.ts` with API calls
2. **Projects API** → Add projects section with API integration
3. **Blog API** → Add blog section with API integration
4. **Profile API** (partially done) → Complete integration for About section
5. **File Upload API** → Support images for experiences, projects, profile

### Why This Approach?

This phased migration approach allows me to:

- **Build the admin portal first** (most important for content management)
- **Test the API thoroughly** before migrating public pages
- **Ensure the API design is correct** by using it in the admin dashboard
- **Avoid breaking the public site** during development

The architecture is already **API-ready** - the frontend components are built with the expectation of API data, they're just using constants as a temporary placeholder.

**Example of Easy Migration:**

```typescript
// Current (hard-coded)
import { experiences } from '@/constants/experiences';

// After migration (API-driven)
const { data: experiences } = useQuery({
  queryKey: ['experiences'],
  queryFn: () => api.getAllExperiences()
});
```

---

## Authentication System

This project implements **OAuth 2.0 Password Grant** (RFC 6749) for authentication.

### Authentication Flow

```
1. Login Request
   POST /api/auth/token
   Body: { username, password }
   ↓
   Backend validates credentials
   ↓
   Response: {
     access_token: "JWT token",
     token_type: "Bearer",
     expires_in: 86400
   }

2. Authenticated Requests
   Authorization: Bearer <access_token>
   ↓
   JWT Authentication Middleware validates token
   ↓
   Token Blacklist Middleware checks if token revoked
   ↓
   Request processed

3. Logout
   POST /api/auth/logout
   Authorization: Bearer <access_token>
   ↓
   Token added to in-memory blacklist
   ↓
   Token cannot be used for future requests
```

### Token Introspection

Check token validity:
```bash
POST /api/auth/token/introspect
Authorization: Bearer <access_token>

Response:
{
  "active": true,
  "username": "admin",
  "exp": 1760784270,
  "iat": 1760697870,
  "sub": "00000000-0000-0000-0000-000000000001"
}
```

### Security Features

- **Generic Error Messages**: Prevents user enumeration attacks
- **Timing Attack Prevention**: Random delays on failed login attempts
- **Secure Logging**: Logs user IDs instead of usernames
- **Token Expiry**: 24-hour token lifetime
- **Token Blacklisting**: In-memory cache for revoked tokens
- **JWT Claims**: Includes `sub`, `iat`, `nbf`, `exp`, `jti`, and role claims

---

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC
- **Styling**: Tailwind CSS with CSS variables
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **State Management**: TanStack React Query
- **Forms**: React Hook Form + Zod validation

### Backend
- **Framework**: ASP.NET Core 8 (Minimal APIs)
- **Database**: PostgreSQL 15
- **ORM**: Entity Framework Core 8
- **Architecture**: Vertical Slice Architecture
- **Messaging**: MediatR (CQRS pattern)
- **Validation**: FluentValidation
- **Authentication**: JWT Bearer (OAuth 2.0 compliant)
- **API Documentation**: Swagger/OpenAPI

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Authentication**: In-memory token blacklist (IMemoryCache)
- **Logging**: Microsoft.Extensions.Logging
- **CORS**: Configured for local development

---

## Outstanding Features

### High Priority

1. **Frontend Migration to API**
   - [ ] Migrate public portfolio experiences to use `/api/experiences` endpoint
   - [ ] Replace hard-coded skills with API data (once Skills API complete)
   - [ ] Replace hard-coded projects with API data (once Projects API complete)
   - [ ] Replace hard-coded profile data with API data
   - [ ] Add loading states and error handling for API calls
   - [ ] Implement data caching with TanStack React Query

2. **Skills Management API**
   - [ ] Create skills CRUD endpoints
   - [ ] Admin UI for managing skills
   - [ ] Skill categories/grouping
   - [ ] Public skills display endpoint

3. **Projects/Portfolio Management**
   - [ ] Projects CRUD endpoints
   - [ ] Image upload for project screenshots
   - [ ] Project categories and tags
   - [ ] Admin UI for project management
   - [ ] Public projects listing and detail pages

4. **Blog System**
   - [ ] Blog posts CRUD endpoints
   - [ ] Markdown support for blog content
   - [ ] Blog categories and tags
   - [ ] Admin UI for blog management
   - [ ] Public blog listing and detail pages

5. **File Upload System**
   - [ ] Image upload endpoint (experiences, projects, profile)
   - [ ] File validation (size, type)
   - [ ] Storage strategy (local vs cloud)
   - [ ] Image optimization/resizing

### Medium Priority

6. **Contact Form**
   - [ ] Contact form submission endpoint
   - [ ] Email notification integration
   - [ ] Form validation and spam protection
   - [ ] Success/error handling UI

7. **SEO Optimization**
   - [ ] Meta tags management
   - [ ] Dynamic sitemap generation
   - [ ] robots.txt configuration
   - [ ] Open Graph tags for social sharing

8. **Analytics**
   - [ ] Page view tracking
   - [ ] Admin dashboard analytics
   - [ ] Visitor statistics

### Low Priority / Future Enhancements

9. **Rate Limiting**
   - [ ] API rate limiting middleware
   - [ ] Login attempt throttling
   - [ ] IP-based rate limiting

10. **Refresh Token Implementation**
    - [ ] Extend authentication to support refresh tokens
    - [ ] Persistent token storage
    - [ ] Token rotation strategy

11. **Testing**
    - [ ] Unit tests for backend handlers
    - [ ] Integration tests for API endpoints
    - [ ] Frontend component tests
    - [ ] E2E tests for critical flows

12. **CI/CD Pipeline**
    - [ ] GitHub Actions workflow
    - [ ] Automated testing
    - [ ] Docker image builds
    - [ ] Deployment automation

---

## Project Structure

```
portfolio-project/
├── frontend/                      # React TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/            # Admin dashboard components
│   │   │   ├── portfolio/        # Public portfolio components
│   │   │   └── ui/               # shadcn/ui reusable components
│   │   ├── pages/
│   │   │   ├── admin/            # Admin pages (dashboard, login, etc.)
│   │   │   └── portfolio/        # Public pages
│   │   ├── lib/
│   │   │   └── api.ts            # API client (OAuth 2.0 compliant)
│   │   ├── constants/            # Navigation, skills, experiences
│   │   ├── hooks/                # Custom React hooks
│   │   └── utils/                # Helper functions
│   └── package.json
│
├── backend/                       # ASP.NET Core 8 API
│   ├── Features/                 # Vertical Slices
│   │   ├── Auth/
│   │   │   ├── Login/           # POST /api/auth/token
│   │   │   ├── Logout/          # POST /api/auth/logout
│   │   │   └── TokenIntrospection/  # POST /api/auth/token/introspect
│   │   ├── Experiences/         # CRUD for work experiences
│   │   └── Profile/             # User profile management
│   ├── Database/
│   │   ├── Entities/            # EF Core entities
│   │   └── PortfolioDbContext.cs
│   ├── Shared/
│   │   ├── Contracts/           # Common interfaces (IEndpoint)
│   │   ├── Extensions/          # Service registration extensions
│   │   ├── Middleware/          # Custom middleware (auth, exceptions)
│   │   └── Services/            # Shared services (token blacklist)
│   ├── Program.cs               # Application entry point
│   ├── Dockerfile               # Production build
│   └── PortfolioApi.csproj
│
└── docker-compose.yml            # Orchestrates Frontend + API + PostgreSQL
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm (frontend)
- **Docker** and Docker Compose (backend + database)
- **.NET 8 SDK** (for local backend development without Docker)

### Quick Start (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dribbble-replica-dreamscape-clone
   ```

2. **Start All Services (Docker Compose)**
   ```bash
   docker-compose up -d --build
   ```
   This command starts three services in detached mode:
   - **PostgreSQL Database**: `localhost:5432`
     - Database: `portfolio_db`
     - User: `postgres`
     - Password: `postgres`
   - **ASP.NET Core API**: `http://localhost:5001`
     - Swagger UI: `http://localhost:5001/swagger`
     - Health Check: `http://localhost:5001/health`
   - **React Frontend**: `http://localhost:3000`
     - Development mode with hot module replacement

   The stack starts in order: PostgreSQL → API (after health check) → Frontend (after API starts). Database migrations run automatically on API startup.

3. **Access the Application**
   - **Portfolio**: http://localhost:3000
   - **Admin Login**: http://localhost:3000/admin/login
   - **Swagger API Docs**: http://localhost:5001/swagger
   - **Health Check**: http://localhost:5001/health

### Default Admin Credentials

```
Username: admin
Password: Admin@123
```

### Environment Variables

The backend uses `appsettings.json` for configuration (included in the repository for development):

```json
{
  "ConnectionStrings": {
    "PostgreSQL": "Host=postgres;Port=5432;Database=portfolio_db;Username=postgres;Password=postgres"
  },
  "JwtSettings": {
    "SecretKey": "your-super-secret-key-that-should-be-changed-in-production",
    "Issuer": "PortfolioApi",
    "Audience": "PortfolioClient"
  }
}
```

**⚠️ IMPORTANT**: Change the JWT `SecretKey` before deploying to production.

---

## Docker Deployment

The project uses **Docker Compose** for complete containerized deployment of all services including the frontend, backend API, and database. This provides a consistent development environment that closely mirrors production.

### Docker Architecture

```
docker-compose.yml
├── PostgreSQL Container (postgres:16-alpine)
│   ├── Port: 5432
│   ├── Database: portfolio_db
│   ├── Volume: postgres_data (persistent storage)
│   └── Health Check: Ensures DB is ready before API starts
│
├── API Container (ASP.NET Core 8)
│   ├── Built from: backend/Dockerfile
│   ├── Port: 5001 (maps to internal 8080)
│   ├── Environment: Development
│   ├── Volume: ./backend/wwwroot/uploads (file uploads)
│   ├── Depends On: PostgreSQL (healthy)
│   ├── Restart Policy: unless-stopped
│   └── Network: portfolio-network (bridge)
│
└── Frontend Container (React + Vite)
    ├── Built from: frontend/Dockerfile.dev
    ├── Port: 3000 (maps to internal 7000)
    ├── Development Mode: Hot Module Replacement enabled
    ├── Volumes: Source code mounted for live reload
    ├── Depends On: API
    ├── Restart Policy: unless-stopped
    └── Network: portfolio-network (bridge)
```

### Docker Compose Configuration

The `docker-compose.yml` defines three services:

**PostgreSQL Service:**
- Uses official PostgreSQL 16 Alpine image (lightweight)
- **Persistent Volume**: `postgres_data` ensures database survives container restarts
- **Health Check**: `pg_isready` command runs every 10 seconds
- **Network Isolation**: Uses custom bridge network for service communication

**API Service:**
- Builds from `backend/Dockerfile` (multi-stage build)
- **Dependency Management**: Waits for PostgreSQL health check before starting
- **Auto-Migration**: Runs EF Core migrations on startup via `ApplyMigrationsAsync()`
- **File Uploads**: Mounts `wwwroot/uploads` as volume for persistent file storage
- **Restart Policy**: Automatically restarts on failure (except manual stop)

**Frontend Service:**
- Builds from `frontend/Dockerfile.dev` (Node 20 Alpine)
- **Development Mode**: Runs Vite dev server with hot module replacement
- **Live Reload**: Source code mounted as volumes for instant file sync
- **Dependency Management**: Waits for API service before starting
- **Port Mapping**: External port 3000 maps to internal Vite port 7000
- **Volume Mounts**: Selective mounting (src/, public/, config files) + node_modules exclusion

### Docker Commands

```bash
# Start all services in detached mode
docker-compose up -d

# View logs (all services)
docker-compose logs -f

# View API logs only
docker-compose logs -f api

# View PostgreSQL logs only
docker-compose logs -f postgres

# Restart services after code changes
docker-compose restart api

# Rebuild and restart (after Dockerfile or dependency changes)
docker-compose up -d --build

# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes database data)
docker-compose down -v

# Check service status
docker-compose ps

# Execute commands in running containers
docker-compose exec api dotnet --version
docker-compose exec postgres psql -U postgres -d portfolio_db
```

### Dockerfile (Multi-Stage Build)

The backend uses a **multi-stage Dockerfile** for optimized image size:

1. **Build Stage** (`mcr.microsoft.com/dotnet/sdk:8.0`)
   - Restores NuGet dependencies
   - Compiles application in Release mode

2. **Publish Stage**
   - Creates deployment artifacts
   - Removes development files

3. **Final Stage** (`mcr.microsoft.com/dotnet/aspnet:8.0`)
   - Smaller runtime-only image
   - Copies published artifacts
   - Configures entry point

### Volume Persistence

**PostgreSQL Data Volume:**
- Volume Name: `postgres_data`
- Location: Docker managed volume
- **Survives**: Container restarts, `docker-compose down`
- **Deleted**: `docker-compose down -v` (use with caution)

**Upload Files Volume:**
- Host Path: `./backend/wwwroot/uploads`
- Container Path: `/app/wwwroot/uploads`
- Files are stored on your local machine, not in container

### Network Configuration

**Custom Bridge Network (`portfolio-network`):**
- Enables service-to-service communication by name
- API connects to PostgreSQL using hostname `postgres` (not localhost)
- Connection string: `Host=postgres;Port=5432;Database=portfolio_db`

### Dockerized Frontend Benefits

The frontend runs in a Docker container with development-optimized configuration:

- ✅ **Consistent Environment**: Same setup across all developer machines
- ✅ **Hot Module Replacement**: Volume mounts enable instant file sync
- ✅ **One Command Setup**: Single `docker-compose up` starts entire stack
- ✅ **Network Isolation**: All services communicate via Docker network
- ✅ **No Local Dependencies**: Only Docker required, no Node.js installation needed
- ✅ **Production Parity**: Development environment mirrors production deployment

**Production Deployment Options**:
- **Option 1**: Multi-stage build in Dockerfile (build → nginx serve)
- **Option 2**: Build static files and deploy to CDN (Vercel, Netlify)
- **Option 3**: Serve from ASP.NET Core's `UseStaticFiles()` after `npm run build`

### Docker Troubleshooting

**API won't start:**
```bash
# Check if PostgreSQL is healthy
docker-compose ps

# View API startup logs
docker-compose logs api

# Common fix: Restart services
docker-compose restart
```

**Database connection refused:**
```bash
# Ensure PostgreSQL is running
docker-compose ps postgres

# Check PostgreSQL logs
docker-compose logs postgres

# Verify connection string in appsettings.json
# Host should be "postgres" (service name), not "localhost"
```

**Port conflicts:**
```bash
# If port 5001 is in use
sudo lsof -i :5001

# Change port mapping in docker-compose.yml
ports:
  - "5002:8080"  # Map to different host port
```

**Rebuild after code changes:**
```bash
# Quick restart (code changes picked up via volume mount)
docker-compose restart api

# Full rebuild (dependency or Dockerfile changes)
docker-compose up -d --build
```

---

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/token` | No | Obtain access token |
| POST | `/api/auth/logout` | Yes | Revoke current token |
| POST | `/api/auth/token/introspect` | Yes | Validate token status |

### Experience Management

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/experiences` | No | Get all experiences |
| POST | `/api/experiences` | Yes | Create new experience |
| PUT | `/api/experiences/{id}` | Yes | Update experience |
| DELETE | `/api/experiences/{id}` | Yes | Delete experience |

### Profile Management

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/profile` | No | Get profile information |
| PUT | `/api/profile` | Yes | Update profile |

### Health Check

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health` | No | API health status |

### Example: Login Request

```bash
curl -X POST http://localhost:5001/api/auth/token \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "Admin@123"
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 86400
}
```

### Example: Create Experience

```bash
curl -X POST http://localhost:5001/api/experiences \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "company": "Acme Corp",
    "title": "Senior Software Engineer",
    "location": "Remote",
    "startDate": "2023-01-01",
    "endDate": null,
    "isCurrent": true,
    "description": [
      "Led development of microservices architecture",
      "Mentored junior developers"
    ],
    "technologies": ["C#", "React", "PostgreSQL"],
    "displayOrder": 1
  }'
```

---

## Development Workflow

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start development server (with HMR)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Backend Development

**With Docker (Recommended):**
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build
```

**Local Development (without Docker):**
```bash
cd backend

# Restore dependencies
dotnet restore

# Run migrations
dotnet ef database update

# Start API
dotnet run

# Watch mode (auto-reload)
dotnet watch run
```

### Database Migrations

```bash
cd backend

# Create a new migration
dotnet ef migrations add MigrationName

# Apply migrations
dotnet ef database update

# Remove last migration
dotnet ef migrations remove
```

### Accessing Postgres Database

```bash
# Connect to PostgreSQL container
docker exec -it portfolio-postgres psql -U postgres -d portfolio_db

# Common queries
\dt                    # List all tables
\d+ table_name         # Describe table structure
SELECT * FROM "AdminUsers";
```

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Acknowledgments

- **Milan Jovanović** - For popularizing Vertical Slice Architecture in .NET
- **shadcn** - For the excellent UI component library
- **Jimmy Bogard** - Creator of MediatR

---

## Contact

For questions, suggestions, or feedback, please reach out via the contact form on the portfolio website.

---

**Built with ❤️ using Vertical Slice Architecture**
