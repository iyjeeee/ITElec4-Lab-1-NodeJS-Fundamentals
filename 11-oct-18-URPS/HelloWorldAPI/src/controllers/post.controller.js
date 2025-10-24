// src/controllers/post.controller.js
import * as postService from '../services/post.service.js';
import asyncHandler from 'express-async-handler';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await postService.getAllPosts();
    return res
        .status(200)
        .json(new ApiResponse(200, posts, "Posts retrieved successfully"));
});

export const getPostById = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.getPostById(postId);
    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post retrieved successfully"));
});

export const createPost = asyncHandler(async (req, res) => {
    const newPost = await postService.createPost(req.body);
    return res
        .status(201)
        .json(new ApiResponse(201, newPost, "Post created successfully"));
});

export const updatePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.updatePost(postId, req.body);
    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post updated successfully"));
});

export const partiallyUpdatePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const updates = req.body;
    const post = await postService.partiallyUpdatePost(postId, updates);
    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post updated successfully"));
});

export const deletePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    await postService.deletePost(postId);
    return res.status(204).send();
});
