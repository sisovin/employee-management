# Employee Management

These are both the backend and frontend for the Employee App, built with Deno. It provides APIs for user authentication and employee management. The project provides a structured task breakdown for building a **CRUD Employee Application** with **React, Deno, Hono**, and authentication using **Argon2, JWT, and Refresh Tokens**.  

---

## **Project Tasks Breakdown**  

### **1. Project Setup**
- [ ] Initialize a new **Deno** project.  
- [ ] Set up **Hono** as the backend framework.  
- [ ] Configure **Drizzle ORM** with **PostgreSQL**.  
- [ ] Install dependencies for authentication (`argon2`, `jsonwebtoken`, `dotenv`, etc.).  
- [ ] Set up **Redis** as a caching layer for authentication tokens.  

---

### **2. Database and Models**
- [ ] Create a **PostgreSQL database**.  
- [ ] Define a **User model** with Drizzle ORM (`id, name, email, password, role`).  
- [ ] Define an **Employee model** (`id, name, position, salary, department`).  
- [ ] Define a **Refresh Token model** to store user sessions.  
- [ ] Run migrations to apply schema changes.  

---

### **3. Authentication System**
#### **Signup** (Register User)
- [ ] Implement **password hashing** using **Argon2** before storing in the database.  
- [ ] Create a route to **register users** (`/api/auth/signup`).  

#### **Login** (User Authentication)
- [ ] Verify user credentials and check if the password matches the hashed one.  
- [ ] Generate a **JWT access token** and **refresh token** upon successful login.  
- [ ] Store the **refresh token** in Redis with an expiry time.  
- [ ] Create a route for **user login** (`/api/auth/login`).  

#### **Logout**
- [ ] Implement a **logout** feature to remove the refresh token from Redis.  
- [ ] Create a route for **user logout** (`/api/auth/logout`).  

#### **JWT Middleware (Auth Protection)**
- [ ] Create a middleware to **verify JWT tokens** and restrict access to protected routes.  
- [ ] Implement **role-based authentication** (e.g., `Admin`, `User`).  

#### **Refresh Token Handling**
- [ ] Implement a `/api/auth/refresh-token` route to issue a new access token when the old one expires.  
- [ ] Validate and refresh the **JWT token** using the refresh token stored in Redis.  

---

### **4. CRUD Operations for Employees**
#### **Create Employee**
- [ ] Implement `/api/employees` **POST** route to insert a new employee into the database.  
- [ ] Validate the request and ensure only authorized users can create employees.  

#### **Read Employees**
- [ ] Implement `/api/employees` **GET** route to fetch all employees.  
- [ ] Implement `/api/employees/:id` **GET** route to fetch an employee by ID.  

#### **Update Employee**
- [ ] Implement `/api/employees/:id` **PUT** route to update an employee's details.  

#### **Delete Employee**
- [ ] Implement `/api/employees/:id` **DELETE** route to remove an employee.  

---

### **5. Caching with Redis**
- [ ] Cache **frequently accessed employee data** in Redis for better performance.  
- [ ] Implement Redis-based caching for the `/api/employees` GET route.  

---

### **6. Frontend (React)**
#### **React Setup**
- [ ] Create a **React project** with Vite or Next.js.  
- [ ] Install dependencies (`axios`, `react-router-dom`, `jwt-decode`).  
- [ ] Set up **React Router** for navigation.  

#### **Authentication UI**
- [ ] Create **Signup and Login** pages.  
- [ ] Handle JWT **token storage** in localStorage or HttpOnly cookies.  
- [ ] Implement **automatic login/logout state management**.  
- [ ] Protect routes using **React Router Private Routes**.  

#### **Employee CRUD UI**
- [ ] Implement a **dashboard page** listing all employees.  
- [ ] Create **forms** for adding and updating employees.  
- [ ] Add delete functionality with a confirmation prompt.  

---

### **7. Deployment & Testing**
- [ ] Write unit and integration tests for API endpoints.  
- [ ] Deploy the **backend on Deno Deploy** or **Vercel**.  
- [ ] Deploy the **frontend on Vercel or Netlify**.  
- [ ] Set up **Redis** on a cloud provider like Upstash.  

---

## Employee App Backend
### Project Structure

```
📦 employee-app-backend  
├── 📂 src/  
│   ├── 📂 config/  
│   │   ├── db.ts             # PostgreSQL connection using Drizzle ORM  
│   │   ├── redis.ts          # Redis client configuration  
│   │   ├── env.ts            # Environment variables loader  
│   │  
│   ├── 📂 models/  
│   │   ├── user.ts           # User model (id, name, email, password, role)  
│   │   ├── employee.ts       # Employee model (id, name, position, salary)  
│   │   ├── refreshToken.ts   # Refresh token model  
│   │  
│   ├── 📂 routes/  
│   │   ├── auth.ts           # Authentication routes (signup, login, logout, refresh-token)  
│   │   ├── employee.ts       # CRUD operations for employees  
│   │  
│   ├── 📂 middleware/  
│   │   ├── auth.ts           # JWT Authentication Middleware  
│   │   ├── role.ts           # Role-based Authorization Middleware  
│   │  
│   ├── 📂 controllers/  
│   │   ├── authController.ts     # Signup, login, logout logic  
│   │   ├── employeeController.ts # CRUD logic for employees  
│   │  
│   ├── 📂 utils/  
│   │   ├── hash.ts            # Argon2 password hashing functions  
│   │   ├── jwt.ts             # JWT token generation & validation  
│   │  
│   ├── app.ts                 # Main entry point, Hono instance  
│  
├── .env                       # Environment variables  
├── deno.json                  # Deno configuration  
├── README.md                  # Documentation
```

## Setup and Running

1. Clone the repository:
    ```sh
    git clone https://github.com/githubnext/workspace-blank.git
    cd workspace-blank
    ```

2. Create a `.env` file in the root directory and add the following environment variables:
    ```
    DATABASE_URL=your_postgresql_database_url
    REDIS_URL=your_redis_url
    JWT_SECRET=your_jwt_secret
    ```

3. Run the application:
    ```sh
    deno run --allow-net --allow-read --allow-env src/app.ts
    ```

## API Documentation

### Authentication Routes

- **POST /signup**
    - Request Body: `{ "name": "string", "email": "string", "password": "string" }`
    - Response: `{ "message": "User created successfully" }`

- **POST /login**
    - Request Body: `{ "email": "string", "password": "string" }`
    - Response: `{ "accessToken": "string", "refreshToken": "string" }`

- **POST /logout**
    - Request Body: `{ "refreshToken": "string" }`
    - Response: `{ "message": "User logged out successfully" }`

- **POST /refresh-token**
    - Request Body: `{ "refreshToken": "string" }`
    - Response: `{ "accessToken": "string" }`

### Employee Routes

- **GET /employees**
    - Response: `[ { "id": "number", "name": "string", "position": "string", "salary": "number" } ]`

- **POST /employees**
    - Request Body: `{ "name": "string", "position": "string", "salary": "number" }`
    - Response: `{ "message": "Employee created successfully" }`

- **PUT /employees/:id**
    - Request Body: `{ "name": "string", "position": "string", "salary": "number" }`
    - Response: `{ "message": "Employee updated successfully" }`

- **DELETE /employees/:id**
    - Response: `{ "message": "Employee deleted successfully" }`

---

# **🚀 Frontend (React + Vite)**
📂 `employee-app-frontend/`  
```
📦 employee-app-frontend  
├── 📂 src/  
│   ├── 📂 api/  
│   │   ├── axiosInstance.ts      # Axios setup for API requests  
│   │   ├── authApi.ts            # Signup, Login, Logout API calls  
│   │   ├── employeeApi.ts        # CRUD API calls for employees  
│  
│   ├── 📂 components/  
│   │   ├── Navbar.tsx            # Navigation bar  
│   │   ├── PrivateRoute.tsx       # Protect routes based on auth  
│  
│   ├── 📂 pages/  
│   │   ├── Login.tsx             # Login page  
│   │   ├── Signup.tsx            # Signup page  
│   │   ├── Dashboard.tsx         # Employee dashboard  
│   │   ├── EmployeeForm.tsx      # Create / Edit employee form  
│  
│   ├── 📂 context/  
│   │   ├── AuthContext.tsx       # Authentication state management  
│  
│   ├── 📂 hooks/  
│   │   ├── useAuth.ts            # Custom hook for authentication  
│  
│   ├── main.tsx                  # React app entry point  
│   ├── App.tsx                   # Main component with routing  
│  
├── .env                           # Environment variables  
├── vite.config.ts                  # Vite configuration  
├── README.md                       # Documentation  
```

---

These structure separates concerns for **scalability and maintainability**. I will change whenever I code implementing specific parts completely! 🚀
