import httpStatus from 'http-status';
import { PaginationParameters } from 'mongoose-paginate-v2';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import * as taskService from '../services/task.service';
import ApiError from '../utils/ApiError';

export const createTask = catchAsync(async (req: Request, res: Response) => {
  const task = await taskService.createTask(req.body);
  res.status(httpStatus.CREATED).json(task);
});

export const getTasks = catchAsync(async (req: Request, res: Response) => {
  const [filter, options] = new PaginationParameters(req).get();
  if (Number(req.query.limit) === 0) options.limit = 0;
  const tasks = await taskService.queryTasks(filter, options);
  res.json(tasks);
});

export const getTask = catchAsync(async (req: Request, res: Response) => {
  const task = await taskService.getTask(req.params.taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  res.json(task);
});

export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const task = await taskService.updateTaskById(req.params.taskId, req.body);

  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  res.json(task);
});

export const deleteTask = catchAsync(async (req: Request, res: Response) => {
  await taskService.deleteTaskById(req.params.taskId);
  res.status(httpStatus.NO_CONTENT).json();
});
