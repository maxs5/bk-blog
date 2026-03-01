const express = require('express');
const { getPost, getPosts, addPost, editPost, deletePost } = require('../controllers/post');
const { addComment, deleteComment } = require('../controllers/comment');
const mapPost = require('../helpers/mapPost');
const mapComment = require('../helpers/mapComment');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');

const router = express.Router();

router.get('/posts', async (req, res) => {
    const { posts, lastPage } = await getPosts(
        req.query.search,
        req.query.limit,
        req.query.page,
    );

    res.send({ data: { lastPage, posts: posts.map(mapPost) } });
});

router.get('/posts/:id', async (req, res) => {
    const post = await getPost(req.params.id);

    res.send({ data: mapPost(post) });
});

router.use(authenticated);

router.post('/posts/:id/comments', async (req, res) => {
    const newComment = await addComment(req.params.id, {
        content: req.body.content,
        author: req.user.id,
    });

    res.send({ data: mapComment(newComment) });
});

router.delete(
    '/posts/:postId/comments/:commentId',
    hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
    async (req, res) => {
        await deleteComment(
            req.params.postId,
            req.params.commentId,
        );

        res.send({ error: null });
    },
);

router.post('/posts', hasRole([ROLES.ADMIN]), async (req, res) => {
    const newPost = await addPost({
        title: req.body.title,
        content: req.body.content,
        image: req.body.imageUrl,
    });

    res.send({ data: mapPost(newPost) });
});

router.patch('/posts/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    const updatedPost = await editPost(
        req.params.id,
        {
            title: req.body.title,
            content: req.body.content,
            image: req.body.imageUrl,
        },
    );

    res.send({ data: mapPost(updatedPost) });
});

router.delete('/posts/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    await deletePost(req.params.id);

    res.send({ error: null });
});

module.exports = router;
