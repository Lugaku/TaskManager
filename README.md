# Task Manager

A single-page task management application built with React and Vite.

## Overview

Task Manager allows users to create project groups and manage tasks inside each project with advanced editing capabilities.  
The application is fully client-side and focused on clean architecture, performance, and structured UI design.

## Core Features

### Project Structure
- Create project groups
- Manage multiple projects inside groups
- Organize tasks per project

### Task Management
Each task supports:
- Priority level
- Workflow stage (status)
- Due date
- Task type (bug or feature/task)
- Description
- Comments

Tasks can be edited without limitations at any time.

### Visualization Modes
- **List View** — categorized and structured task layout
- **Board View** — drag-and-drop workflow management
- **Smart Sorting View** — highlights:
  - Overdue tasks
  - Tasks close to deadline
  - High-priority tasks

### UI & UX
- Strict minimalistic layout
- Structured positioning
- Responsive design
- Clean and readable interface

---

## Architecture & Technologies

- React (Hooks-based architecture)
- Context API for global state management
- useReducer for predictable state updates
- useMemo / useCallback for performance optimization
- Component-based modular structure
- Tailwind CSS for styling
- Vite as development environment
- LocalStorage for persistent client-side data storage

---

## Data Management

The project does not use a backend or database.  
All data is stored locally in the browser using LocalStorage.

State management is handled through Context + Reducers with optimized rendering and modular component structure to avoid large, overloaded files.

---

## Installation & Run

```bash
npm install
npm run dev
```

---

## Screenshots

![screenshot1](./screenshots/1.png)
![screenshot2](./screenshots/2.png)
![screenshot3](./screenshots/3.png)
![screenshot4](./screenshots/4.png)
![screenshot5](./screenshots/5.png)
![screenshot6](./screenshots/6.png)
![screenshot7](./screenshots/7.png)