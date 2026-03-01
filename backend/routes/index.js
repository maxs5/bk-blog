const express = require('express');
const userRoutes = require('./user');
const postRoutes = require('./post');

const router = express.Router();

router.use(userRoutes);
router.use(postRoutes);

module.exports = router;
