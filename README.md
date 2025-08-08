# Web Task Manager


- /frontend   # React (Vite) app
- /backend    # Node.js + Express API ( mongodb/in memory)


# Quick Start

- cd backend
- cp .env.example .env  #can use mondgo db or just in memory

- (avoid setting up mongodb by using in momory, open the backend/.env file and set 
USE_MEMORY=true
MONGO_URI= )

- npm install
- npm run dev           #http://localhost:4000


 `http://localhost:4000/api/tasks`

# 2) Frontend (React)

- cd frontend
- cp .env.example .env  
- npm install
- npm run dev           #http://localhost:5173


# API Routes

- `GET    /api/tasks` – fetch all tasks
- `POST   /api/tasks` – create task `{ title, description?, priority?, dueDate? }`
- `PUT    /api/tasks/:id` – update any fields (incl. `{ completed }` to toggle)
- `DELETE /api/tasks/:id` – delete task

# Task structure
ts
{
  _id: string;
  title: string;
  description?: string;
  completed: boolean;      
  priority: 'low'|'medium'|'high';
  dueDate?: string;       
  createdAt: string;
  updatedAt: string;
}

