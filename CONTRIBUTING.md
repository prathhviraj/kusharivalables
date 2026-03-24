# Contributing to Kusharivalables

First off, thank you for considering contributing to Kusharivalables. It's people like you that make Kusharivalables such a great application.

## 1. Project Overview
This repository contains both the Backend (Node.js/Express) and Frontend (React/Vite).

## 2. Directory Structure
```
├── backend/                  # Node.js/Express REST API
│   ├── config/               # Database and 3rd-party integration configs
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Express middlewares (Auth, Errors)
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API endpoint definitions
│   └── scripts/              # Useful utilities (seeding database)
├── frontend/                 # React/Vite Single Page Application
│   ├── src/components/       # Reusable UI components
│   ├── src/context/          # React Contexts
│   ├── src/pages/            # Main application views/pages
│   └── src/services/         # API services (axios)
└── .prettierrc               # Prettier code formatting rules
```

## 3. Code Conventions
To ensure consistency across the codebase, we use **Prettier**.
- Make sure to format your changes using `npx prettier --write .` prior to committing.
- Every major file (e.g., Models, Entry Points) should contain a `JSDoc` header detailing the module functionality.
- Write meaningful variable names, use ES6+ features, and comment complex logic.

## 4. Workflows
1. Fork the repo or create a new branch (`git checkout -b feature/xyz`).
2. Make your updates.
3. Test locally.
4. Open a Pull Request for review.

We enforce a strict review process to maintain Code Quality matching Top-Tier Multi-National Corporation Standards.
