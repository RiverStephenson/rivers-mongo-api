import connection from "../config/connection.js";
import { User } from "../models/index.js";
connection.on("error", (err) => err);
connection.once("open", async () => {
    console.log("connected");
    let userCheck = await connection.db
        ?.listCollections({ name: "users" })
        .toArray();
    if (userCheck?.length) {
        await connection.dropCollection("users");
    }
    const users = [];
    for (let i = 0; i < 3; i++) {
        const user = User.findOne();
        const email = `${user}@fakemail.com`;
        users.push({
            user,
            email,
        });
    }
    await User.insertMany(users);
    console.table(users);
    console.info("Seeding complete! 🌱");
    process.exit(0);
});
