import { objectToArray } from './helper-functions';

export const TASK_STATUS = {
  DONE: 'done',
  PENDING: 'pending',
};
export const TASK_STATUS_ARRAY = objectToArray(TASK_STATUS);

export const STRING_MAX_LENGTH_100 = 100;
export const STRING_MAX_LENGTH_1000 = 1000;
