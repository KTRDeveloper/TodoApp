import mongoose, { Document, PaginateModel, now } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { toJSON, handleErrors } from './plugins/index';
import { STRING_MAX_LENGTH_100, STRING_MAX_LENGTH_1000, TASK_STATUS, TASK_STATUS_ARRAY } from '../utils/constants';

export interface ITask {
  status: string;
  title: string;
  description: string;
  createdAt: Date;
}
export interface ITaskDoc extends Document, ITask {}
export interface ITaskModel extends PaginateModel<ITaskDoc> {}

export const taskSchema = new mongoose.Schema<ITask>(
  {
    status: {
      type: String,
      required: true,
      enum: TASK_STATUS_ARRAY,
      default: TASK_STATUS.PENDING,
    },
    title: { type: String, maxLength: STRING_MAX_LENGTH_100, required: true },
    description: { type: String, maxLength: STRING_MAX_LENGTH_1000, required: true },
  },
  {
    timestamps: true,
  },
);

taskSchema.index({ createdAt: -1 });

taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);
taskSchema.plugin(handleErrors);

export default mongoose.model<ITaskDoc, ITaskModel>('Task', taskSchema);
