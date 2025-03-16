# MedSch-backend

MedSch-backend is a RESTful API for managing medication schedules and user accounts.

## Setup

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev
```

Default API endpoint:

```
http://localhost:3000/api
```

## API Documentation

### Authentication

#### Sign Up

- **Endpoint**: `POST /api/auth/sign-up`
- **Description**: Register a new user
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User created successfully",
    "data": {
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "password": "[hashed]"
      },
      "token": "jwt_token_here"
    }
  }
  ```

#### Sign In

- **Endpoint**: `POST /api/auth/sign-in`
- **Description**: Authenticate a user
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User signed in successfully",
    "data": {
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "password": "[hashed]"
      },
      "token": "jwt_token_here"
    }
  }
  ```

#### Sign Out

- **Endpoint**: `GET /api/auth/sign-out`
- **Description**: Sign out a user
- **Response**:
  ```json
  {
    "message": "User signed out successfully"
  }
  ```

### Users

All user endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token
```

#### Get All Users

- **Endpoint**: `GET /api/users`
- **Description**: Retrieve all users
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
  ]
  ```

#### Get User by ID

- **Endpoint**: `GET /api/users/:id`
- **Description**: Retrieve a specific user
- **Response**:
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

#### Update User

- **Endpoint**: `PUT /api/users/:id`
- **Description**: Update user information
- **Request Body**:
  ```json
  {
    "name": "John Updated",
    "email": "john.updated@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "name": "John Updated",
    "email": "john.updated@example.com"
  }
  ```

#### Delete User

- **Endpoint**: `DELETE /api/users/:id`
- **Description**: Delete a user
- **Response**:
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

### Medications

All medication endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token
```

#### Get All Medications

- **Endpoint**: `GET /api/meds`
- **Description**: Retrieve all medications for the authenticated user
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "Aspirin",
      "dosagePerDay": 2,
      "frequency": 1,
      "medStartDate": "2023-01-01T00:00:00.000Z",
      "medEndDate": "2023-01-10T00:00:00.000Z",
      "neededMed": 20,
      "userId": 1
    }
  ]
  ```

#### Create Medication

- **Endpoint**: `POST /api/meds`
- **Description**: Create a new medication
- **Request Body**:
  ```json
  {
    "name": "Ibuprofen",
    "dosagePerDay": 3,
    "frequency": 2,
    "medStartDate": "2023-02-01T00:00:00.000Z",
    "medEndDate": "2023-02-15T00:00:00.000Z"
  }
  ```
- **Response**: Returns the created medication object including calculated `neededMed`

#### Get Medication by ID

- **Endpoint**: `GET /api/meds/:id`
- **Description**: Retrieve a specific medication
- **Response**:
  ```json
  {
    "id": 1,
    "name": "Aspirin",
    "dosagePerDay": 2,
    "frequency": 1,
    "medStartDate": "2023-01-01T00:00:00.000Z",
    "medEndDate": "2023-01-10T00:00:00.000Z",
    "neededMed": 20,
    "userId": 1
  }
  ```

#### Update Medication

- **Endpoint**: `PUT /api/meds/:id`
- **Description**: Update medication information
- **Request Body** (all fields optional):
  ```json
  {
    "name": "Updated Med Name",
    "dosagePerDay": 4,
    "frequency": 2,
    "medStartDate": "2023-02-01T00:00:00.000Z",
    "medEndDate": "2023-02-20T00:00:00.000Z"
  }
  ```
- **Response**: Returns the updated medication object

#### Delete Medication

- **Endpoint**: `DELETE /api/meds/:id`
- **Description**: Delete a medication
- **Response**:
  ```json
  {
    "message": "Medication deleted successfully"
  }
  ```

## Data Models

### User

- `id`: Integer (Primary Key)
- `email`: String (Unique)
- `name`: String
- `password`: String (Hashed)
- Has many medications

### Medication

- `id`: Integer (Primary Key)
- `name`: String
- `dosagePerDay`: Integer
- `frequency`: Integer (days between doses)
- `medStartDate`: DateTime
- `medEndDate`: DateTime
- `neededMed`: Integer (calculated total medication needed)
- `userId`: Integer (Foreign Key)

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

Error responses follow this format:

```json
{
  "success": false,
  "error": {
    "message": "Error message here"
  }
}
```

---

This project was created using `bun init` in bun v1.2.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
