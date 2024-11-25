import { Request, Response } from "express";
import { Thought } from "../models/index.js";

export const createReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    );

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { friends: req.params.reactionId } },
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought with that ID" });
    }

    res.json({ message: "Reaction Removed" });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};
