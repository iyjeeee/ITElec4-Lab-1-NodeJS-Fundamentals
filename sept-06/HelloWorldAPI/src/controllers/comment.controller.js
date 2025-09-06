import * as commentService from '../services/comment.service.js';

export const getAllComments = (req, res) => {
    const comments = commentService.getAllComments();
    res.json(comments);
};

export const getCommentsByPost = (req, res) => {
    const postId = parseInt(req.params.postId);
    const comments = commentService.getCommentsByPostId(postId);
    res.json(comments);
};

export const createComment = (req, res) => {
    const postId = parseInt(req.params.postId);
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: 'Comment text is required' });
    }

    const newComment = commentService.createComment(postId, text);
    res.status(201).json(newComment);
};