import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';


  // Function to get all of the Thoughts by invoking the find() method with no arguments.
  // Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
  export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Gets a single Thought using the findOneAndUpdate method. We pass in the ID of the Thought and then respond with it, or an error if not found
  export const getSingleThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No Thought with that ID' });
      }

      res.json(thought);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // Creates a new Thought. Accepts a request body with the entire Thought object.
  // Because Thoughts are associated with Users, we then update the User who created the app and add the ID of the Thought to the Thoughts array
  export const createThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        })
      }

      res.json('Created the Thought 🎉');
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return;
    }
  }

  // Updates and Thought using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
  export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!Thought) {
        return res.status(404).json({ message: 'No Thought with this id!' });
      }

      res.json(thought);
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return;
    }
  }

  // Deletes an Thought from the database. Looks for a user by ID.
  // Then if the user exists, we look for any users associated with the app based on he app ID and update the Thoughts array for the User.
  export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No Thought with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.body.userId  },
        { $pull: { Thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'No User with that ID',
        });
      }

      res.json({ message: 'Thought successfully deleted!' });
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // Adds a reaction to an Thought. This method is unique in that we add the entire body of the reaction rather than the ID with the mongodb $addToSet operator.
  // export const addReaction = async (req: Request, res: Response) => {
  //   try {
  //     const thought = await Thought.findOneAndUpdate(
  //       { _id: req.params.ThoughtId },
  //       { $addToSet: { reactions: req.body } },
  //       { runValidators: true, new: true }
  //     );

  //     if (!thought) {
  //       return res.status(404).json({ message: 'No Thought with this id!' });
  //     }

  //     res.json(Thought);
  //     return;
  //   } catch (err) {
  //     res.status(500).json(err);
  //     return;
  //   }
  // }

  // Remove Thought reaction. This method finds the Thought based on ID. It then updates the reactions array associated with the app in question by removing it's reactionId from the reactions array.
  // export const removeReaction = async (req: Request, res: Response) => {
  //   try {
  //     const thought = await Thought.findOneAndUpdate(
  //       { _id: req.params.ThoughtId },
  //       { $pull: { reactions: { reactionId: req.params.reactionId } } },
  //       { runValidators: true, new: true }
  //     );

  //     if (!thought) {
  //       return res.status(404).json({ message: 'No Thought with this id!' });
  //     }

  //     res.json(thought);
  //     return;
  //   } catch (err) {
  //     res.status(500).json(err);
  //     return;
  //   }
  // }

