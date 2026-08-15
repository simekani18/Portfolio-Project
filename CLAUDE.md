# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This repository is organized into two main folders:

- **`frontend/`**: React + TypeScript frontend application
- **`backend/`**: ASP.NET Core 8 API with PostgreSQL

## Development Commands

### Frontend (from `frontend/` directory)

- **Start development server**: `cd frontend && npm run dev` (runs on port 7000)
- **Build for production**: `cd frontend && npm run build`
- **Build for development**: `cd frontend && npm run build:dev`
- **Lint code**: `cd frontend && npm run lint`
- **Preview production build**: `cd frontend && npm run preview`

### Backend (from root directory)

- **Start with Docker**: `docker-compose up -d` (API on port 5001, PostgreSQL on 5432)
- **View logs**: `docker-compose logs -f api`
- **Stop services**: `docker-compose down`

## Frontend Architecture

The frontend is a personal portfolio website built with:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Zod validation

### Key Architecture Patterns

- **Component Structure**: Single-page application with component-based sections
- **Layout**: Main page (`frontend/src/pages/Index.tsx`) composes all sections in order: Navigation → Hero → About → Experience → TechnicalSkills → Portfolio → Contact → Footer
- **UI Components**: All reusable UI components in `frontend/src/components/ui/` following shadcn/ui patterns
- **Routing**: Simple routing with main index page and dedicated work experience page
- **Styling**: Uses CSS custom properties for theming with Tailwind utility classes
- **Path Aliases**: `@/` maps to `frontend/src/` directory for clean imports
- **Admin Portal**: Located at `frontend/src/pages/admin/` with full CRUD functionality for experiences

### Component Organization

- **Page Components**: Located in `frontend/src/pages/`
- **Section Components**: Main sections in `frontend/src/components/` (Hero, About, etc.)
- **UI Components**: Reusable components in `frontend/src/components/ui/`
- **Admin Components**: Admin-specific components in `frontend/src/components/admin/`
- **Utilities**: Helper functions in `frontend/src/lib/utils.ts`
- **Hooks**: Custom hooks in `frontend/src/hooks/`
- **API Client**: API integration in `frontend/src/lib/api.ts`

### Design System

- Uses a black/white aesthetic with clean typography
- Implements CSS variables for consistent theming
- Component animations handled by Framer Motion
- Responsive design with mobile-first approach
- Custom background path animations for visual interest

### Development Notes

- Project uses Lovable platform integration (`lovable-tagger` plugin)
- ESLint configured with TypeScript and React rules
- Unused variables warning disabled (`@typescript-eslint/no-unused-vars: "off"`)
- Vite configured with path aliases and development-specific plugins
- Uses React 18 with createRoot for rendering