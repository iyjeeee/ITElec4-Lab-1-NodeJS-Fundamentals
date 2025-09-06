let comments = [];
let nextCommentId = 1;

export const getAllComments = () => {
    return comments;
};

export const getCommentsByPostId = (postId) => {
    return comments.filter(comment => comment.postId === postId);
};

export const createComment = (postId, text) => {
    const newComment = {
        id: nextCommentId++,
        postId: postId,
        text: text,
        createdAt: new Date()
    };
    comments.push(newComment);
    return newComment;
};