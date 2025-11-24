import * as commentService from '../services/comment.service.js';
import asyncHandler from 'express-async-handler';
import { ApiResponse } from '../utils/ApiResponse.js';

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of all comments
 */
export const getAllComments = asyncHandler(async (req, res) => {
    const comments = await commentService.getAllComments();
    return res
        .status(200)
        .json(new ApiResponse(200, comments, "Comments retrieved successfully"));
});

/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     summary: Get all comments for a specific post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of comments for the post
 *       404:
 *         description: Post not found
 */
export const getCommentsByPostId = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const comments = await commentService.getCommentsByPostId(postId);
    return res
        .status(200)
        .json(new ApiResponse(200, comments, "Comments retrieved successfully"));
});

/**
 * @swagger
 * /posts/{postId}/comments:
 *   post:
 *     summary: Create a comment for a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - authorId
 *             properties:
 *               text:
 *                 type: string
 *               authorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Post not found
 */
export const createCommentForPost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const { text, authorId } = req.body;
    const newComment = await commentService.createComment(postId, authorId, { text });
    return res
        .status(201)
        .json(new ApiResponse(201, newComment, "Comment created successfully"));
});
