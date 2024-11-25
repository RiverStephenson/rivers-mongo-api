import { Schema, model } from "mongoose";
// Schema to create User model
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, match: /.+\@.+\..+/, unique: true },
    thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "thought",
        }],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
userSchema
    .virtual("friendCount")
    // Getter
    .get(function () {
    return `You have ${this.friends.length} friends.`;
});
// Initializes our User model
const User = model("user", userSchema);
// const thoughtData = [
//   {
//     thoughtText:
//       "How many licks does it take to get to the center of a tootsie pop?",
//     createdAt: Date.now,
//     username: "MrOwl",
//     reactions: ["One", "T-Hooooo", "*crunch*", "The world may never know"],
//   },
// ];
// const friendData: ObjectId[] = [];
// User.create({
//   username: "MrOwl",
//   email: "hoothoot@skymail.fly",
//   thoughts: thoughtData,
//   friends: friendData,
// })
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));
export default User;
