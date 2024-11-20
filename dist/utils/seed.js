import connection from '../config/connection.js';
import { User } from '../models/index.js';
import { getRandomName } from './data.js';
connection.on('error', (err) => err);
connection.once('open', async () => {
    console.log('connected');
    // Delete the collections if they exist
    let Check = await connection.db?.listCollections({ name: 's' }).toArray();
    if (Check?.length) {
        await connection.dropCollection('s');
    }
    let userCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
    if (userCheck?.length) {
        await connection.dropCollection('users');
    }
    const users = [];
    for (let i = 0; i < 20; i++) {
        const fullName = getRandomName();
        const first = fullName.split(' ')[0];
        const last = fullName.split(' ')[1];
        users.push({
            first,
            last,
            age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
        });
    }
    await User.insertMany(users);
    // loop through the saved s, for each  we need to generate a  response and insert the  responses
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
