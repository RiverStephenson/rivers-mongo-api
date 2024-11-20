import { Schema, model } from "mongoose";
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: { type: [] }
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
thoughtSchema.virtual("reactionCount").get(function () {
    return `${this.reactions.length} Reactions!`;
});
const Thought = model('thought', thoughtSchema);
export default Thought;
