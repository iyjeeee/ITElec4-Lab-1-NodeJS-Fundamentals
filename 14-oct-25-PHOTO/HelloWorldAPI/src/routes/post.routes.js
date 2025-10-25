// src/routes/post.routes.js
import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import * as commentController from '../controllers/comment.controller.js';
import { validatePost, validateComment } from '../middlewares/validator.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', postController.getAllPosts);
router.post('/', authMiddleware, validatePost, postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', authMiddleware, validatePost, postController.updatePost);
router.patch('/:id', postController.partiallyUpdatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

router.get('/:postId/comments', commentController.getCommentsByPostId);
router.post('/:postId/comments', validateComment, commentController.createCommentForPost);

export default router;
