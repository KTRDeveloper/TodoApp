import express, { Router } from 'express';
import * as taskController from '../../controllers/task.controller';
import validate from '../../middlewares/validate';
import taskValidation from '../../validations/task.validation';

const router: Router = express.Router();

router
  .route('/')
  .get(validate(taskValidation.getTasks), taskController.getTasks)
  .post(validate(taskValidation.createTask), taskController.createTask);

router
  .route('/:taskId')
  .get(validate(taskValidation.getTask), taskController.getTask)
  .patch(validate(taskValidation.updateTask), taskController.updateTask)
  .delete(validate(taskValidation.deleteTask), taskController.deleteTask);

export default router;
