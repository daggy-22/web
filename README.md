# Kifiya DFC Portal

A comprehensive digital financial services portal built with Next.js, providing an integrated platform for financial services, user management, and AI-powered assistance.

## Overview

The Kifiya DFC Portal is a modern web application designed to facilitate digital financial services. It features a responsive design, real-time chat assistance, and comprehensive user management capabilities. The application is built using Next.js 15 with TypeScript and follows modern development practices.

## Technology Stack

- **Framework**: Next.js 15.1.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS with DaisyUI
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Forms**: React Hook Form with Yup validation
- **Icons**: React Icons
- **Maps**: Leaflet with React Leaflet
- **Notifications**: React Hot Toast
- **Containerization**: Docker

## Project Structure

```
dfs_portal/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── (onboarding)/            # User onboarding flow
│   ├── (pages)/                 # Main application pages
│   ├── financing/               # Financial services pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout component
│   └── favicon.ico              # Application icon
├── components/                   # Reusable UI components
│   ├── common/                  # Shared components
│   │   └── Chatbot.tsx         # AI chat assistant
│   ├── device/                  # Device-related components
│   └── order/                   # Order management components
├── config/                      # Configuration files
│   └── config.ts               # Application configuration
├── libs/                        # Utility libraries
├── providers/                   # React context providers
│   └── ReactQueryProvider.tsx  # React Query provider
├── stores/                      # Zustand state stores
├── utils/                       # Utility functions
├── public/                      # Static assets
├── Dockerfile                   # Docker configuration
├── docker-compose.yml           # Docker Compose setup
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## Key Features

### AI-Powered Chat Assistant

- Integrated chatbot with React Icons
- Multi-language support with language code display
- Real-time message handling and history
- Responsive design with smooth animations
- User session management with localStorage

### Authentication System

- Secure user authentication flow
- Protected routes and middleware
- User session management
- Onboarding process for new users

### Financial Services

- Digital financial service management
- Order processing and tracking
- Payment plan management
- Device and service filtering

### User Interface

- Modern, responsive design
- Tailwind CSS with DaisyUI components
- Consistent design system
- Mobile-first approach
- Accessibility considerations

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm package manager
- Docker (for containerized development)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd dfs_portal
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at [http://localhost:9001](http://localhost:9001).

### Docker Development

For containerized development:

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d --build
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL=your_database_url
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=your_database_name
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password

# API Configuration
API_BASE_URL=https://api.example.com
API_KEY=your_api_key
API_SECRET=your_api_secret

# Application Configuration
NODE_ENV=development
PORT=9001
HOSTNAME=0.0.0.0

# External Services
REDIS_URL=redis://localhost:6379
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
```

## Available Scripts

- `npm run dev` - Start development server on port 9001
- `npm run build` - Build the application for production
- `npm run start` - Start production server on port 9001
- `npm run lint` - Run ESLint for code quality checks

## Configuration

### Chat Configuration

The chatbot is configured through the `config/config.ts` file, which includes:

- Backend API endpoints
- Supported languages and language codes
- Welcome messages and loading states
- Chat history settings

### Tailwind Configuration

Custom Tailwind CSS configuration in `tailwind.config.ts` includes:

- Custom color palette
- DaisyUI plugin configuration
- Responsive breakpoints
- Custom component styles

## Deployment

### Production Build

```bash
npm run build
npm run start
```

### Docker Deployment

```bash
docker build -t dfs-portal .
docker run -p 9001:9001 dfs-portal
```

### Environment-Specific Configuration

- Development: Uses `.env.local` for local development
- Production: Configure environment variables in your deployment platform
- Docker: Uses `.env.dev` for containerized environments

## Architecture Patterns

### Component Structure

- Functional components with TypeScript
- Custom hooks for state management
- Context providers for global state
- Reusable component library

### State Management

- Zustand for global state management
- React Query for server state
- Local state with React hooks
- Persistent storage with localStorage

### Data Flow

- API calls through React Query
- Form handling with React Hook Form
- Real-time updates with WebSocket connections
- Error handling with toast notifications

## Performance Optimizations

- Next.js App Router for optimized routing
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- React Query for efficient data fetching
- Tailwind CSS for optimized styles

## Security Considerations

- Environment variable protection
- Input validation with Yup schemas
- XSS protection with proper sanitization
- CORS configuration for API endpoints
- Secure authentication flow

## Contributing

1. Follow the existing code style and patterns
2. Write TypeScript interfaces for all data structures
3. Include proper error handling
4. Add appropriate comments for complex logic
5. Test changes thoroughly before submitting

## License

This project is proprietary software developed for Kifiya Digital Financial Services.
