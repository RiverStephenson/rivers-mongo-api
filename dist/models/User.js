import { Schema, model } from "mongoose";
// Schema to create User model
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, match: /.+\@.+\..+/, unique: true },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
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
export default User;
