import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, deleteUser, updateUser } from '../../controllers/userController.js';
import { createFriend, deleteFriend } from '../../controllers/friendController.js';
router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend);
// /api/users
router.route('/').post(createUser).get(getUsers);
// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
export default router;
