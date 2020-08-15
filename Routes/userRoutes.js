const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Models/User');

const router = express.Router();

// POST create user
// NEVER EVER SAVE PASSWORDS as PLAINTEXT
router.post('/signup', async (req, res) => {
    const { firstName, lastName, age, hobbies, password, email } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(422);
        res.json({'message': 'user exists'});
        return;
    }

    if (age < 13) {
        res.status(401);
        res.json({'message': 'user is not old enough to signup'});
        return;
    }

    const user = await new User({
        firstName,
        lastName,
        age,
        hobbies,
        password: await bcrypt.hash(password, 12),
        email
    }).save();

    res.send(user);
});

// GET a single user by id
router.get('/get/:id', async (req, res) => {
    const _id = req.params.id;

    const user = await User.findOne({ _id });

    if (!user) {
        res.status(422);
        res.json({'message': 'user not found'});
        return
    }

    res.send(user);
});

// GET all users
router.get('/get', async (req, res) => {
    const users = await User.find();

    res.send(users);
});

// DELETE user by id
router.delete('/delete/id/:id', async (req, res) => {
    const _id = req.params.id;

    const userExists = await User.findByIdAndDelete({ _id });

    if (!userExists) {
        res.status(422);
        res.json({ 'message': 'user doesn\'t exist' });
        return
    }

    res.json({ 'message': 'user deleted' });
});

// DELETE user by email
router.delete('/delete/email/:email', async (req, res) => {
    const email = req.params.email;

    await User.findOneAndDelete({ email });

    res.json({ 'message': 'user deleted' });
});

// PUT user by id
router.put('/update/put/:id', async (req, res) => {
    const _id = req.params.id;
    const { firstName, lastName, age, password, hobbies, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate({ _id }, { $set: { ...req.body } }, { new: true });

    res.send(updatedUser);
});

// PATCH user by id
router.patch('/update/patch/:id', async (req, res) => {
    const _id = req.params.id;
    const { firstName, lastName, age, password, hobbies, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate({ _id }, { $set: { ...req.body } }, { new: true });

    res.send(updatedUser);
});

// POST user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(422);
        res.json({ 'message': 'invalid credentials' });
        return
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        res.status(422);
        res.json({ 'message': 'invalid credentials' });
        return
    }

    res.send(user);
});

module.exports = router;