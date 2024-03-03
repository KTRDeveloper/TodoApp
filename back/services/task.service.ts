import httpStatus from 'http-status';
import Task, { ITaskDoc } from '../models/task.model';
import ApiError from '../utils/ApiError';
import { getNormalizedPaginationOptions } from '../utils/services-utils';
import { PaginateResult } from 'mongoose';

export const createTask = async (taskBody: any) => {
  const task = await Task.create(taskBody);
  return task;
};

export const queryTasks = async (filter: any, options: any) => {
  const tasks = await Task.paginate(filter, getNormalizedPaginationOptions(options));
  return tasks;
};

export const getTask = async (taskId: any) => {
  const task = await Task.findById(taskId);
  return task;
};

export const updateTaskById = async (taskId: any, updateBody: any) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  Object.assign(task, updateBody);
  await task.save();
  return task;
};

export const deleteTaskById = async (taskId: any) => {
  await Task.findByIdAndDelete(taskId);
};
