# Portfolio API - Backend

ASP.NET Core 8 Minimal API with **Vertical Slice Architecture** for portfolio management.

## Architecture

This project implements **Milan Jovanović's Vertical Slice Architecture** pattern:
- Each feature is self-contained with its own Request/Response/Handler/Validator
- Uses MediatR for CQRS pattern
- FluentValidation for input validation
- Entity Framework Core with PostgreSQL
- JWT authentication for admin access

## Tech Stack

- **.NET 8** - Latest LTS version
- **Entity Framework Core 8** - ORM with PostgreSQL
- **MediatR** - CQRS and mediator pattern
- **FluentValidation** - Input validation
- **JWT Bearer Authentication** - Admin authentication
- **PostgreSQL** - Primary database
- **BCrypt.Net** - Password hashing
- **Swagger/OpenAPI** - API documentation

## Project Structure

```
PortfolioApi/
├── Features/              # Vertical slices by feature
│   ├── Auth/
│   │   └── Login/
│   └── Profile/
│       ├── GetProfile/
│       └── UpdateProfile/
├── Database/
│   ├── Entities/         # Domain entities
│   ├── Migrations/       # EF migrations
│   └── PortfolioDbContext.cs
├── Shared/
│   ├── Contracts/        # IEndpoint interface
│   ├── Extensions/       # DI and endpoint registration
│   ├── Middleware/       # Exception handling
│   └── Common/           # Result pattern, errors
└── Program.cs            # Application startup
```

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Docker & Docker Compose](https://www.docker.com/products/docker-desktop)

### Installation

1. **Install .NET 8 SDK** (if not already installed):
   ```bash
   # macOS
   brew install dotnet-sdk

   # Or download from: https://dotnet.microsoft.com/download/dotnet/8.0
   ```

2. **Restore dependencies**:
   ```bash
   cd backend/PortfolioApi
   dotnet restore
   ```

3. **Apply database migrations**:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

### Running Locally (Without Docker)

1. **Start PostgreSQL** (if not using Docker):
   ```bash
   # Update ConnectionString in appsettings.json to point to your local PostgreSQL
   ```

2. **Run the API**:
   ```bash
   cd backend/PortfolioApi
   dotnet run
   ```

3. **Access Swagger UI**: http://localhost:5000/swagger

### Running with Docker

From the **project root**:

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down

# Stop and remove volumes (clears database)
docker-compose down -v
```

**API will be available at**: http://localhost:5000
**Swagger UI**: http://localhost:5000/swagger

## Phase 1 Features (Completed)

### Authentication
- **POST /api/auth/login** - Admin login (returns JWT token)
  - Default credentials: `admin` / `Admin@123`

### Profile Management
- **GET /api/profile** - Get portfolio profile (public)
- **PUT /api/profile** - Update portfolio profile (admin only)

### Health Check
- **GET /health** - API health status

## API Authentication

All admin endpoints require JWT authentication:

1. **Login** to get a token:
   ```bash
   POST /api/auth/login
   {
     "username": "admin",
     "password": "Admin@123"
   }
   ```

2. **Use the token** in subsequent requests:
   ```
   Authorization: Bearer <your-token-here>
   ```

## Environment Variables

Key configuration in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "PostgreSQL": "Host=postgres;Port=5432;Database=portfolio_db;Username=postgres;Password=postgres"
  },
  "JwtSettings": {
    "SecretKey": "YOUR_SECRET_KEY_HERE",
    "Issuer": "PortfolioApi",
    "Audience": "PortfolioClient",
    "ExpirationDays": 7
  }
}
```

⚠️ **IMPORTANT**: Change the JWT `SecretKey` in production!

## Database Migrations

```bash
# Create a new migration
dotnet ef migrations add MigrationName

# Apply migrations
dotnet ef database update

# Rollback to specific migration
dotnet ef database update PreviousMigrationName

# Remove last migration (if not applied)
dotnet ef migrations remove
```

## Testing Endpoints

### Using cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}'

# Get Profile (public)
curl http://localhost:5000/api/profile

# Update Profile (admin only)
curl -X PUT http://localhost:5000/api/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Simekani Mabambe",
    "title": "Senior Software Engineer",
    "bio": "Updated bio",
    "email": "contact@simekani.dev",
    "yearsOfExperience": 4
  }'
```

### Using Swagger UI

Navigate to http://localhost:5000/swagger and use the "Authorize" button to add your JWT token.

## Future Phases

### Phase 2: Work Experience CRUD
- GET /api/experiences
- POST /api/experiences (admin)
- PUT /api/experiences/{id} (admin)
- DELETE /api/experiences/{id} (admin)

### Phase 3: Projects & Skills CRUD
- Projects endpoints
- Skills endpoints
- Image upload handling

### Phase 4: Daily Journal (Learning Log)
- Separate `journal` schema
- Full-text search
- Tagging system

### Phase 5: AI Content Generation
- Local LLM integration (Ollama)
- Blog post generation from journal entries
- CV update generation

## Development Tips

### Adding a New Feature Slice

1. Create feature folder: `Features/YourFeature/CreateYourFeature/`
2. Create `YourFeature.cs` with:
   - Request/Response DTOs
   - Command/Query (MediatR)
   - Validator (FluentValidation)
   - Handler (IRequestHandler)
   - Endpoint (IEndpoint)
3. Run the app - endpoint auto-registers!

### SOLID Principles

This architecture enforces:
- **S**ingle Responsibility - Each slice handles one feature
- **O**pen/Closed - Add features without modifying existing code
- **L**iskov Substitution - Handlers are substitutable
- **I**nterface Segregation - IEndpoint is minimal
- **D**ependency Inversion - Depends on abstractions (IMediator)

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps

# Check logs
docker-compose logs postgres
```

### EF Migrations Not Applying
```bash
# Manually run migrations in container
docker-compose exec api dotnet ef database update
```

## License

This is a personal portfolio project by Simekani Mabambe.
