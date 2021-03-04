const User = require('../database/models/user');
const O_Auth = require('../database/models/O_Auth');
const { passwordHasher, tokenizer } = require('../helper');

module.exports = {
    authUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email }); // пошук юзера в БД по мейлу

            if (!user) {
                throw new Error('NO USER');
            }

            await passwordHasher.compare(password, user.password); // перевірка паролю

            const tokens = tokenizer(); // генеруються токени (вертається обєкт)

            await O_Auth.create({ ...tokens, _user_id: user._id }); // токени записуються в БД з привязкою юзера по id

            res.json(tokens);
        } catch (e) {
            res.json(e.message);
        }
    }
};
