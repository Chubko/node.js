const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const pathToUsers = path.join(process.cwd(), 'database', 'users.json');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

module.exports = {
    createUser: async (userObject) => {
        try {
            const usersFromFile = await readFile(pathToUsers);
            const DB = JSON.parse(usersFromFile.toString());

            if (DB.some(value => value.email === userObject.email)) {
                return;
            }

            DB.push(userObject);
            await writeFile(pathToUsers, JSON.stringify(DB));
        } catch (e) {
            console.log(e.message);
        }
    },

    findAllUsers: async () => {
        try {
            const usersFromFile = await readFile(pathToUsers);

            return JSON.parse(usersFromFile.toString());
        } catch (e) {
            console.log(e.message);
        }
    },

    findUserByName: async (userName) => {
        try {
            const usersFromFile = await readFile(pathToUsers);
            const DB = JSON.parse(usersFromFile.toString());

            return DB.filter(user => user.name === userName);
        } catch (e) {
            console.log(e.message);
        }
    },

    deleteUser: async (userName) => {
        try {
            const usersFromFile = await readFile(pathToUsers);
            const DB = JSON.parse(usersFromFile.toString());

            DB.splice(DB.indexOf(userName), 1);
            await writeFile(pathToUsers, JSON.stringify(DB));
        } catch (e) {
            console.log(e.message);
        }
    }
}
