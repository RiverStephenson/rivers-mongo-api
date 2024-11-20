import { Reaction, User } from '../models/index.js';
// Function to get all of the Reactions by invoking the find() method with no arguments.
// Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
export const getReactions = async (_req, res) => {
    try {
        const Reactions = await Reaction.find();
        res.json(Reactions);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// Gets a single Reaction using the findOneAndUpdate method. We pass in the ID of the Reaction and then respond with it, or an error if not found
export const getSingleReaction = async (req, res) => {
    try {
        const reaction = await Reaction.findOne({ _id: req.params.ReactionId });
        if (!Reaction) {
            return res.status(404).json({ message: 'No Reaction with that ID' });
        }
        res.json(reaction);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// Creates a new Reaction. Accepts a request body with the entire Reaction object.
// Because Reactions are associated with Users, we then update the User who created the app and add the ID of the Reaction to the Reactions array
export const createReaction = async (req, res) => {
    try {
        const reaction = await Reaction.create(req.body);
        const user = await User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { Reactions: reaction._id } }, { new: true });
        if (!user) {
            return res.status(404).json({
                message: 'Reaction created, but found no user with that ID',
            });
        }
        res.json('Created the Reaction 🎉');
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
};
// Updates and Reaction using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
export const updateReaction = async (req, res) => {
    try {
        const reaction = await Reaction.findOneAndUpdate({ _id: req.params.ReactionId }, { $set: req.body }, { runValidators: true, new: true });
        if (!Reaction) {
            return res.status(404).json({ message: 'No Reaction with this id!' });
        }
        res.json(reaction);
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
};
// Deletes an Reaction from the database. Looks for an app by ID.
// Then if the app exists, we look for any users associated with the app based on he app ID and update the Reactions array for the User.
export const deleteReaction = async (req, res) => {
    try {
        const reaction = await Reaction.findOneAndDelete({ _id: req.params.reactionId });
        if (!reaction) {
            return res.status(404).json({ message: 'No Reaction with this id!' });
        }
        const user = await User.findOneAndUpdate({ Reactions: req.params.reactionId }, { $pull: { Reactions: req.params.reactionId } }, { new: true });
        if (!user) {
            return res.status(404).json({
                message: 'Reaction created but no user with this id!',
            });
        }
        res.json({ message: 'Reaction successfully deleted!' });
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// Adds a tag to an Reaction. This method is unique in that we add the entire body of the tag rather than the ID with the mongodb $addToSet operator.
export const addTag = async (req, res) => {
    try {
        const reaction = await Reaction.findOneAndUpdate({ _id: req.params.ReactionId }, { $addToSet: { tags: req.body } }, { runValidators: true, new: true });
        if (!reaction) {
            return res.status(404).json({ message: 'No Reaction with this id!' });
        }
        res.json(Reaction);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// Remove Reaction tag. This method finds the Reaction based on ID. It then updates the tags array associated with the app in question by removing it's tagId from the tags array.
export const removeTag = async (req, res) => {
    try {
        const reaction = await Reaction.findOneAndUpdate({ _id: req.params.ReactionId }, { $pull: { tags: { tagId: req.params.tagId } } }, { runValidators: true, new: true });
        if (!reaction) {
            return res.status(404).json({ message: 'No Reaction with this id!' });
        }
        res.json(reaction);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
