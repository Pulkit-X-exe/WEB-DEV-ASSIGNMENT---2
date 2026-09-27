Student Management REST API - Lab Assignment 2
==============================================

1. Project Title
----------------
**Student Management REST API** (2nd-Year B.Tech CSE Lab Assignment)

---

2. Assignment Objective
-----------------------
The objective of this assignment is to develop a beginner-friendly, clean, and modular RESTful API using Node.js and Express.js that performs complete CRUD (Create, Read, Update, Delete) operations on an in-memory student dataset. 

Key learning outcomes include:
- Understanding HTTP request methods (`GET`, `POST`, `PUT`, `DELETE`).
- Using Express.js Router for modular route organization.
- Implementing custom middleware (logging).
- Handling request validation and sending appropriate HTTP status codes.
- Managing centralized error handling (404 Not Found and 500 Internal Server Error).
- Testing REST API endpoints using Postman.

---

3. Technologies Used
--------------------
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Language:** JavaScript (ES6 / CommonJS)
- **Data Format:** JSON
- **Data Storage:** In-memory JavaScript Array (`data/students.js`)
- **Development Tool:** Nodemon
- **API Testing:** Postman

*(Note: In accordance with lab guidelines, no external database or complex ORM is used.)*

---

4. Project Structure
--------------------
```text
student-management-api/
│
├── app.js                   Main application entry point & Express server setup
├── package.json             Project metadata, dependencies, and npm scripts
├── README.md                Project documentation and API testing guide
│
├── routes/
│   └── studentRoutes.js     Modular router containing all CRUD endpoints
│
├── middleware/
│   └── logger.js            Custom logging middleware (Method, URL, Timestamp)
│
└── data/
    └── students.js          In-memory student array
```

---

5. Installation Steps
---------------------
1. Open your terminal / command prompt.
2. Navigate to the project directory:
   ```bash
   cd "assignment-2"
   ```
3. Install required dependencies:
   ```bash
   npm install
   ```

---

6. How to Run the Project
-------------------------
**Production / Default Mode:**
```bash
npm start
```

**Development Mode (with auto-restart via Nodemon):**
```bash
npm run dev
```

Once started, you will see:
```text
Server running on http://localhost:3000
```

---

7. All API Endpoints Summary
----------------------------

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Root health-check endpoint | `200 OK` |
| **GET** | `/students` | Get all students | `200 OK` |
| **GET** | `/students/:id` | Get student by ID | `200 OK` / `404 Not Found` |
| **POST** | `/students` | Create a new student | `201 Created` / `400 Bad Request` |
| **PUT** | `/students/:id` | Update an existing student | `200 OK` / `400 Bad Request` / `404 Not Found` |
| **DELETE** | `/students/:id` | Delete a student by ID | `200 OK` / `404 Not Found` |

---

8. Sample Request Bodies & Responses
------------------------------------

**1. Root Check**
- **URL:** `http://localhost:3000/`
- **Method:** `GET`
- **Response (`200 OK`):**
  ```json
  {
    "message": "Student Management REST API is running"
  }
  ```

---

**2. Get All Students**
- **URL:** `http://localhost:3000/students`
- **Method:** `GET`
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "count": 20,
    "students": [
      { "id": 1, "name": "Rahul Sharma", "age": 20, "course": "BCA" },
      { "id": 2, "name": "Priya Patel", "age": 21, "course": "BTech" },
      { "id": 3, "name": "Amit Kumar", "age": 20, "course": "BCA" },
      { "id": 4, "name": "Sneha Reddy", "age": 22, "course": "BTech" },
      { "id": 5, "name": "Vikas Verma", "age": 21, "course": "MCA" }
    ]
  }
  ```

---

**3. Get Student by ID**
- **URL:** `http://localhost:3000/students/1`
- **Method:** `GET`
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "student": {
      "id": 1,
      "name": "Rahul Sharma",
      "age": 20,
      "course": "BCA"
    }
  }
  ```

*Error Example (ID not found - `404 Not Found`):*
- **URL:** `http://localhost:3000/students/999`
```json
{
  "success": false,
  "message": "Student not found"
}
```

---

**4. Create New Student (POST)**
- **URL:** `http://localhost:3000/students`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body (JSON):**
  ```json
  {
    "name": "Neha",
    "age": 20,
    "course": "BTech"
  }
  ```
- **Response (`201 Created`):**
  ```json
  {
    "success": true,
    "message": "Student created successfully",
    "student": {
      "id": 6,
      "name": "Neha",
      "age": 20,
      "course": "BTech"
    }
  }
  ```

*Validation Error Example (`400 Bad Request`):*
- **Request Body:**
  ```json
  {
    "name": "Test"
  }
  ```
- **Response (`400 Bad Request`):**
  ```json
  {
    "success": false,
    "message": "Name, age and course are required"
  }
  ```

---

**5. Update Existing Student (PUT)**
- **URL:** `http://localhost:3000/students/1`
- **Method:** `PUT`
- **Headers:** `Content-Type: application/json`
- **Request Body (JSON):**
  ```json
  {
    "name": "Rahul Sharma",
    "age": 21,
    "course": "BTech CSE"
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Student updated successfully",
    "student": {
      "id": 1,
      "name": "Rahul Sharma",
      "age": 21,
      "course": "BTech CSE"
    }
  }
  ```

---

**6. Delete Student**
- **URL:** `http://localhost:3000/students/1`
- **Method:** `DELETE`
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Student deleted successfully"
  }
  ```

*Error Example (ID not found - `404 Not Found`):*
```json
{
  "success": false,
  "message": "Student not found"
}
```

---

**7. Undefined Route Handler (404 Not Found)**
- **URL:** `http://localhost:3000/non-existent-route`
- **Method:** `GET`
- **Response (`404 Not Found`):**
  ```json
  {
    "success": false,
    "message": "Route not found"
  }
  ```

---

9. HTTP Status Codes Used
-------------------------
- **`200 OK`**: Successful `GET`, `PUT`, or `DELETE` request.
- **`201 Created`**: Successful `POST` request (new student created).
- **`400 Bad Request`**: Missing or invalid fields in request body / invalid parameter.
- **`404 Not Found`**: Student ID does not exist or route does not exist.
- **`500 Internal Server Error`**: Unexpected server-side exceptions.

---

10. Postman Testing Guide
-------------------------
1. Launch Postman.
2. Select HTTP method (`GET`, `POST`, `PUT`, `DELETE`).
3. Enter endpoint URL (e.g., `http://localhost:3000/students`).
4. For `POST` and `PUT`:
   - Go to the **Body** tab.
   - Choose **raw** radio button.
   - Select **JSON** from dropdown.
   - Paste the sample JSON payload.
5. Click **Send** and inspect:
   - Response Body
   - HTTP Status Code (e.g., `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`)
   - Server console log output showing custom logger timestamp and route.
