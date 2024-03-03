import Joi from 'joi';
import { objectId } from './custom.validation';
import { TASK_STATUS_ARRAY, STRING_MAX_LENGTH_100, STRING_MAX_LENGTH_1000 } from '../utils/constants';

const createTask = {
  body: Joi.object().keys({
    title: Joi.string().required().max(STRING_MAX_LENGTH_100),
    description: Joi.string().required().max(STRING_MAX_LENGTH_1000),
  }),
};

const getTask = {
  params: Joi.object().keys({
    taskId: Joi.string().required().custom(objectId),
  }),
};
const getTasks = () => ({
  query: Joi.object().keys({
    sort: Joi.string(),
    page: Joi.number().integer().positive().allow(0),
    limit: Joi.number().integer().positive().allow(0).required(),
  }),
});
const updateTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    status: Joi.string().valid(...TASK_STATUS_ARRAY),
    title: Joi.string().max(STRING_MAX_LENGTH_100),
    description: Joi.string().max(STRING_MAX_LENGTH_1000),
  }),
};

const deleteTask = {
  params: Joi.object().keys({
    taskId: Joi.string().required().custom(objectId),
  }),
};

export default {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
