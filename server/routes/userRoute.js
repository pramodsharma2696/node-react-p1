import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router();

router.route('/user')
  .get(userController.getAll)
  .post(userController.create);

router.route('/user/:id')
  .get(userController.getById)     
  .put(userController.update)
  .delete(userController.deleteUser);

export default router;