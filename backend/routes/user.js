const express = require('express');
const {
    register,
    login,
    getUsers,
    getRoles,
    updateUser,
    deleteUser,
} = require('../controllers/user');
const mapUser = require('../helpers/mapUser');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { user, token } = await register(req.body.login, req.body.password);

        res.cookie('token', token, { httpOnly: true })
            .send({ error: null, user: mapUser(user) });
    } catch (e) {
        res.send({ error: e.message || 'Unknown error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { user, token } = await login(req.body.login, req.body.password);

        res.cookie('token', token, { httpOnly: true })
            .send({ error: null, user: mapUser(user) });
    } catch (e) {
        res.send({ error: e.message || 'Unknown error' });
    }
});

router.post('/logout', (req, res) => {
    res.cookie('token', '', { httpOnly: true })
        .send({});
});

router.use('/users', authenticated);

router.get('/users', hasRole([ROLES.ADMIN]), async (req, res) => {
    const users = await getUsers();

    res.send({ data: users.map(mapUser) });
});

router.get('/users/roles', hasRole([ROLES.ADMIN]), async (req, res) => {
    const roles = getRoles();

    res.send({ data: roles });
});

router.patch('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    const newUser = await updateUser(req.params.id, {
        role: req.body.roleId,
    });

    res.send({ data: mapUser(newUser) });
});

router.delete('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteUser(req.params.id);

    res.send({ error: null });
});

module.exports = router;

