import { Request, Response } from "express";
import { User } from "../models/index.js";

export const createFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
    );

    if (!user) {
      return res.status(404).json({ message: "No user with that ID" });
    }

    res.json({ message: "Friend Removed" });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};
