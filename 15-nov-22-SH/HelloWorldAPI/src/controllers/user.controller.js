import * as userService from '../services/user.service.js';
import asyncHandler from 'express-async-handler';
import { ApiResponse } from '../utils/ApiResponse.js';

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */
export const createUser = asyncHandler(async (req, res) => {
    const newUser = await userService.createUser(req.body);
    return res
        .status(201)
        .json(new ApiResponse(201, newUser, "User created successfully"));
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
export const getUserById = asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await userService.getUserById(userId);
    return res
        .status(200)
        .json(new ApiResponse(200, user, "User retrieved successfully"));
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 */
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();
    return res
        .status(200)
        .json(new ApiResponse(200, users, "Users retrieved successfully"));
});
