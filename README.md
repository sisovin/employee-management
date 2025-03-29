# Employee App Backend

This is the backend for the Employee App, built with Deno. It provides APIs for user authentication and employee management.

## Project Structure

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
