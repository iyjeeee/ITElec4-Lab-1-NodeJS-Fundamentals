import * as photoService from '../services/photo.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from 'express-async-handler';

/**
 * @swagger
 * /photos/upload:
 *   post:
 *     summary: Upload a photo
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - photo
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *               caption:
 *                 type: string
 *     responses:
 *       201:
 *         description: Photo uploaded successfully
 *       400:
 *         description: No file uploaded
 *       401:
 *         description: Unauthorized
 */
export const uploadPhoto = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new ApiError(400, "Please upload a file");
    }

    const { caption } = req.body;
    const userId = req.user.id;
    const filePath = req.file.path;

    const photoData = { caption, filePath, userId };
    const newPhoto = await photoService.createPhoto(photoData);

    res.status(201).json(new ApiResponse(201, newPhoto, "Photo uploaded successfully"));
});

/**
 * @swagger
 * /photos:
 *   get:
 *     summary: Get all photos for the authenticated user
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user photos
 *       401:
 *         description: Unauthorized
 */
export const getUserPhotos = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const photos = await photoService.getPhotosByUserId(userId);
    res.status(200).json(new ApiResponse(200, photos, "User photos retrieved successfully"));
});

/**
 * @swagger
 * /photos/{id}:
 *   delete:
 *     summary: Delete a photo
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Photo deleted successfully (both database record and file)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the photo owner
 *       404:
 *         description: Photo not found
 */
export const deleteUserPhoto = asyncHandler(async (req, res) => {
    const photoId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    await photoService.deletePhoto(photoId, userId);
    res.status(200).json(new ApiResponse(200, null, "Photo deleted successfully"));
});
