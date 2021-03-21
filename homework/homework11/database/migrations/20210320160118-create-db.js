module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createDatabase('sept-2020');
    },

    down: async (queryInterface) => {
        await queryInterface.dropDatabase('sept-2020');
    }
};
