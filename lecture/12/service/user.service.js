const User = require('../database/models/user');
require('../database/models/car');
// priceGte=3000&priceLte=7000&category=car;lg;xxx&color=red&limit=20&page=7
// price: { $lte: 7000, $gte: 3000 }
//
// { category: { $in: [catArr] } }
module.exports = {
    findAllUsers: async (query = {}) => {
        // винести в хелпер
        // eslint-disable-next-line max-len
        const {
            limit = 20, page = 1, sortBy = 'createdAt', order = 'asc', ...filters
        } = query; // к-ть елем на сторінці і яка сторінка(починається з 1)
        const skip = (page - 1) * limit; // скільки елем пропустити для відображ на певній сторінці
        const keys = Object.keys(filters); // [ priceGte, priceLte, category, color ]
        const filterObject = {};

        const orderBy = order === 'asc' ? -1 : 1;
        const sort = { [sortBy]: orderBy };

        // priceGte=3000&priceLte=7000&category=car;lg;xxx&color=red
        // [ priceGte, priceLte, category, color ]
        keys.forEach(key => {
            switch (key) {
                case 'priceGte':
                    filterObject.price = { ...filterObject.price, $gte: +filters.priceGte };
                    break;
                case 'priceLte':
                    filterObject.price = { ...filterObject.price, $lte: +filters.priceLte };
                    break;
                case 'category':
                    const categories = filters.category.split(';');
                    filterObject.category = { $in: categories };
                    break;
                // case 'name':
                //     filterObject.name = { $regex: filters.name, $options: 'i' };
                //     break;
                default:
                    filterObject[key] = filters[key];
            }
        });
        console.log(query);
        console.log('--------');
        console.log(filterObject);
        console.log(limit);
        console.log(skip);
        console.log(sort);
        const users = await User.find(filterObject).limit(+limit).skip(skip).sort(sort); // з пагінацією
        const count = await User.countDocuments(filterObject); // к-ть знайдених ел

        return {
            data: users,
            page,
            limit,
            count,
            pages: Math.ceil(count / limit)
        };
    },

    /**
     * findUserById
     * @param userId - This is integer ID of user which should be returned
     * @returns {Query<Document | null, Document>} - user...
     */
    findUserById: (userId) => User.findById(userId),

    createUser: (userObject) => User.create(userObject),

    updateUserById: (userId, updateObject) => User.updateOne({ _id: userId }, { $set: updateObject })

};
