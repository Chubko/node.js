const router = require('express').Router();

const User = require('../database/models/user');
const { passwordHasher } = require('../helper');

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('NO USER');
    }

    await passwordHasher.compare(password, user.password);

    res.json('OK');
});

module.exports = router;
