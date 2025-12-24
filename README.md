# 🚀 Enterprise ERP Starter Dashboard

A professional-grade ERP starter template built with Vue 3, TanStack Query, and ShadCN. Designed for high scalability, robust data validation, and an exceptional developer experience.

## 🛠 Tech Stack
This project leverages the modern web ecosystem to ensure performance and maintainability:
- Runtime & Package Manager: Bun (All-in-one fast JavaScript toolkit)
- Framework: Vue 3 (Composition API)
- Build Tool: Vite
- State Management: Pinia (Global UI state)
- Data Fetching: TanStack Query v5 (Server state & caching)
- Validation: Zod (Schema-first validation)
- Form Handling: Vee-Validate
- Styling: Tailwind CSS Version 4 + ShadCN Vue

## 📂 Folder Structure
The directory structure is organized to support large-scale enterprise applications:

```Bash

├── src/
│   ├── api/          # API modules, Axios instances, and endpoint definitions
│   ├── assets/       # Static assets, global fonts, and Tailwind styles
│   ├── components/   # Atomic UI components and ShadCN primitives
│   ├── composables/  # Reusable business logic (e.g., useTable, useAuth)
│   ├── config/       # App constants, environment variables, and menu configs
│   ├── layouts/      # Page wrappers (e.g., AuthLayout, DashboardLayout)
│   ├── pages/        # Route components (Views)
│   ├── plugins/      # Library initializations (VueQuery, Pinia, Custom Plugins)
│   ├── schema/       # Zod validation schemas for forms and API responses
│   └── stores/       # Pinia stores for persistent global state
├── public/           # Unprocessed static files
├── bun.lockb         # Bun lockfile
├── package.json      # Scripts and dependencies
└── vite.config.ts    # Build and alias configurations
```
## 🏗 Key Features
1. Modular API Layer
All communication with backend services is encapsulated within /api. This layer handles request/response transformations and centralized error handling via Axios interceptors.

2. Schema-First Validation
Using Zod, we define the shape of our data once in /schema. These schemas power both form validation (via Vee-Validate) and TypeScript type inference, ensuring end-to-end type safety.

3. Sophisticated State Management
   - Pinia: Handles client-side state like sidebar toggles, theme preferences, and user sessions.
   - TanStack Query: Manages server-side state, including automatic re-fetching, caching, and loading states for ERP data tables.

4. Enterprise UI System
The dashboard utilizes ShadCN Vue, providing accessible, customizable, and consistent UI components that follow the best practices of modern dashboard design.

## 📋 Prerequisites
Before you begin, ensure you have met the following requirements to ensure a smooth development experience:

**Runtime & Environment**
- Bun: Version 1.0.0 or higher. This project uses Bun for its significantly faster install times and all-in-one runner.
- Node.js: (Optional) If you don't have Bun, you can use Node.js 24.x or higher, but bun.lockb is the primary lockfile.
- Operating System: macOS, Linux, or Windows.

## 🚦 Getting Started
**Prerequisites**
[Install Bun](https://bun.com/docs/installation#windows) (highly recommended for this project).

**Installation**
```bash
# Clone the repository
git clone https://github.com/MuhamadAdrian/vue-dashboard.git

# Navigate to directory
cd vue-dashboard

# Install dependencies using Bun
bun install
```

**Development**

```bash
# Start the development server
bun run dev
```

**Production Build**

```bash
# Build and optimize for production
bun run build

# Preview the production build locally
bun run preview
```

## 📐 Development Conventions
- **File Naming**: Use kebab-case for files and PascalCase for Vue components (e.g., InventoryTable.vue).
- **Logic Extraction**: Complex component logic should be moved to /composables to keep views clean.
- **Strong Typing**: Always export types inferred from Zod schemas to keep TypeScript synchronized with validation logic.
