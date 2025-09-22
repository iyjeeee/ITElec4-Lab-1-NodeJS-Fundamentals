### **Lab Part 1: Building a Multi-Resource Blog API with User Relationships**

Welcome to the next evolution of our Node.js API. We have a solid foundation for posts, complete with robust error handling and validation. However, a blog isn't just a collection of posts; it's a platform for authors to share their content.

In this lab, we will introduce a new "Users" (or Authors) resource and, most importantly, create a relationship between a user and their posts. This is a fundamental concept in building almost any real-world application.

#### **Prerequisites**

*   Completion of the "Implementing Robust Error Handling and API Responses" lab.
*   Your MySQL database server is running.

#### **Learning Objectives**

By the end of this lab, you will be able to:

*   Design and implement database table relationships using foreign keys.
*   Build a complete CRUD (Create, Read, Update, Delete) flow for a new resource (Users).
*   Refactor existing services and controllers to work with related data.
*   Understand how to manage and pass relationship IDs (like `authorId`) through your API.

---

### **Part 1: Evolving the Database Schema**

Our first step is to update the database. We need a new table to store users and a way to link posts to these users.

**1. Create the `users` Table**

Execute the following SQL command in your MySQL client to create a table for users.

```sql
-- Make sure you are using the correct database
USE blogdatabase;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> #### **SQL Explanation**
> *   `username VARCHAR(50) NOT NULL UNIQUE`: We are storing a username for each user. The `UNIQUE` constraint ensures that no two users can have the same username.
> *   `email VARCHAR(100) NOT NULL UNIQUE`: Similarly, the `email` must also be unique for each user.
> *   `createdAt ...`: This is a handy way to automatically track when a user was registered.

**2. Link the `posts` Table to the `users` Table**

Now, we need to modify our existing `posts` table to include a reference to the user who created it. This is done using a **foreign key**.

```sql
ALTER TABLE posts
ADD COLUMN authorId INT NOT NULL,
ADD CONSTRAINT fk_author
FOREIGN KEY (authorId) REFERENCES users(id)
ON DELETE CASCADE;
```
> #### **SQL Explanation**
> *   `ALTER TABLE posts ADD COLUMN authorId INT NOT NULL;`: This adds a new integer column named `authorId` to the `posts` table. We make it `NOT NULL` because every post must have an author.
> *   `ADD CONSTRAINT fk_author ...`: This is the crucial part that defines the relationship.
>     *   `FOREIGN KEY (authorId)`: Declares that the `authorId` column in this table is a foreign key.
>     *   `REFERENCES users(id)`: Specifies that `authorId` points to the `id` column in the `users` table. This creates the link. The database will now enforce that any value in `posts.authorId` must be a valid, existing `id` in the `users` table.
>     *   `ON DELETE CASCADE`: This is a powerful rule. It means that if a user is deleted from the `users` table, all of their associated posts will be automatically deleted as well. This helps maintain data integrity.

---

### **Part 2: Building the User Resource (Service, Controller, Routes)**

We will now build the API endpoints for managing users, following the clean architecture we've established.

**1. Create the User Service (`src/services/user.service.js`)**

Your goal is to create a new service file that will handle all direct database interactions for the `users` table.

*   **Create the file:** `src/services/user.service.js`.
*   **Implement `createUser(userData)`:**
    *   This function should accept an object `userData` containing a `username` and `email`.
    *   It needs to execute an `INSERT` query to add a new user to the `users` table.
    *   After a successful insertion, it should call `getUserById` to fetch and return the newly created user's complete data.
    *   **Error Handling:** The `username` and `email` columns have `UNIQUE` constraints. If a user tries to register with an existing username or email, MySQL will throw an error with the code `ER_DUP_ENTRY`. You must wrap your query in a `try...catch` block. If you catch this specific error, throw a new `ApiError` with a `409 Conflict` status code and a user-friendly message like "Username or email already exists."
*   **Implement `getUserById(id)`:**
    *   This function should accept a user `id`.
    *   It must execute a `SELECT` query to find the user with that `id`.
    *   If no user is found (the query returns an empty array), it should throw an `ApiError` with a `404 Not Found` status.
    *   Otherwise, it should return the first row of the result.
*   **Implement `getAllUsers()`:**
    *   This function should execute a `SELECT` query to fetch all users from the `users` table.
    *   Return the array of user objects.

**2. Create the User Controller (`src/controllers/user.controller.js`)**

Now, create the controller to act as the bridge between your API routes and the user service.

*   **Create the file:** `src/controllers/user.controller.js`.
*   Import your `userService`, `ApiResponse`, and `asyncHandler`.
*   **Implement `createUser(req, res)`:**
    *   This function should call `userService.createUser` with the request body (`req.body`).
    *   Wrap the function with your `asyncHandler`.
    *   On success, send a `201 Created` status and a JSON response using your `ApiResponse` class, including the new user data.
*   **Implement `getUserById(req, res)`:**
    *   Use `asyncHandler`.
    *   Call `userService.getUserById`, passing the `id` from the request parameters (`req.params.id`).
    *   On success, send a `200 OK` status with the user data wrapped in an `ApiResponse`.
*   **Implement `getAllUsers(req, res)`:**
    *   Use `asyncHandler`.
    *   Call `userService.getAllUsers`.
    *   On success, send a `200 OK` status with the array of users wrapped in an `ApiResponse`.

**3. Create the User Routes (`src/routes/user.routes.js`)**

Define the API endpoints for the user resource.

*   **Create the file:** `src/routes/user.routes.js`.
*   Import `Router` from `express` and your `userController`.
*   Create a new router instance.
*   Define the following routes and link them to the appropriate controller functions:
    *   `POST /`: Should route to `userController.createUser`.
    *   `GET /`: Should route to `userController.getAllUsers`.
    *   `GET /:id`: Should route to `userController.getUserById`.
*   Export the router.

**4. Update `index.js` to Use the New Routes**

Finally, tell your main Express app to use these new user routes.

*   In your main `index.js` file, import the user router you just created.
*   Mount the router using `app.use()`. It's good practice to prefix your API routes, so mount it at the path `/api/users`.

---

### **Part 3: Connecting Posts to Users**

Now that we have a user system, we must update our post creation logic to require an `authorId`.

**1. Update Post Validation (`src/middlewares/validator.middleware.js`)**

Modify your existing `validatePost` middleware to ensure an `authorId` is provided and is a valid integer.

*   In the array of validation rules for `validatePost`, add a new rule for the `authorId` field.
*   Use `body('authorId')` from `express-validator`.
*   Add the `.isInt({ min: 1 })` validator to ensure it's an integer greater than or equal to 1.
*   Provide a clear error message using `.withMessage()`, such as "A valid author ID is required."

**2. Update the Post Service (`src/services/post.service.js`)**

The `createPost` function must now be updated to accept and insert the `authorId`.

*   Modify the `createPost` function signature or its internal logic to handle `authorId` from the `postData` object.
*   Update your `INSERT` SQL query to include the `authorId` column and pass the `authorId` value as a parameter.
*   **Error Handling:** The database's foreign key constraint will prevent you from creating a post with an `authorId` that doesn't exist in the `users` table. This action will cause MySQL to throw an error with the code `ER_NO_REFERENCED_ROW_2`.
    *   Add or update a `try...catch` block around your query.
    *   If you catch this specific error, throw a new `ApiError` with a `400 Bad Request` status and a message like "Invalid author ID. User does not exist."

The controller `src/controllers/post.controller.js` does **not** need to change, because it simply passes `req.body` to the service, and `req.body` will now contain the `authorId`. This is the beauty of our separated architecture.

---

### **Part 4: Testing the Full Flow**

1.  **Start your server:** `node index.js`
2.  **Create a User:** Make a `POST` request to `http://localhost:3000/api/users` with a JSON body:
    ```json
    {
        "username": "johndoe",
        "email": "john.doe@example.com"
    }
    ```
    You should get a successful response with the new user's data, including their `id` (e.g., `id: 1`).
3.  **Create a Post for that User:** Make a `POST` request to `http://localhost:3000/api/posts` with a JSON body. **Use the `id` from the user you just created.**
    ```json
    {
        "title": "A Post by John",
        "content": "This post is linked to an author.",
        "authorId": 1
    }
    ```
4.  **Test the Validation:** Try to create a post with an `authorId` that doesn't exist (e.g., `999`). You should get a `400 Bad Request` error.

You have now successfully added a new resource and created a database relationship, making your application far more powerful and realistic.

---

### **Challenges**

Now it's your turn to apply these concepts.

#### **Challenge 1: Get All Posts by a Specific Author**

Your task is to create a new endpoint that allows a client to fetch all posts written by a single author.

*   **Endpoint:** `GET /api/users/:userId/posts`
*   **Success Response:** A `200 OK` with a standard `ApiResponse` containing an array of posts.
*   **Steps:**
    1.  **Router:** Add the new route definition. Since the route starts with `/users`, it belongs in `src/routes/user.routes.js`.
    2.  **Controller:** Create a new controller function, e.g., `getPostsByUser`. It will need to get the `userId` from `req.params`.
    3.  **Service:** Create a new service function, e.g., `getPostsByAuthorId(userId)`. This function will execute the SQL query: `SELECT * FROM posts WHERE authorId = ?`.

#### **Challenge 2: Associate Comments with Users**

Just as posts belong to users, comments should also belong to the user who wrote them. Refactor the entire "comments" resource from the previous challenge to link each comment to a user.

*   **Steps:**
    1.  **Database:** `ALTER` the `comments` table to add an `authorId` column with a foreign key referencing `users(id)`.
    2.  **Validation:** Update the comment validation middleware to require a valid `authorId`.
    3.  **Service:** Update the `createComment` service to accept and insert the `authorId`. Add error handling for invalid author IDs.
    4.  **Controller & Routes:** Ensure the controller and routes handle the new data correctly.

#### **Challenge 3 (Bonus): Populate Author Data in Post Responses**

Currently, when you fetch a post, you only get the `authorId`. This isn't very useful for a client application, which would have to make a separate request to get the author's username.

Your task is to modify the `getAllPosts` and `getPostById` service functions to return the author's username and email along with the post data.

*   **Concept:** This requires a SQL `JOIN` statement.
*   **Hint:** The query you'll need will look something like this:
    ```sql
    SELECT
        p.id,
        p.title,
        p.content,
        u.username AS authorUsername,
        u.email AS authorEmail
    FROM
        posts p
    JOIN
        users u ON p.authorId = u.id;
    ```
    You will need to adapt this query for both the `getAllPosts` and `getPostById` functions in `src/services/post.service.js`.