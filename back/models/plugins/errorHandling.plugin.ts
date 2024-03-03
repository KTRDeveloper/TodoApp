import mongoose from 'mongoose';
import ApiError from '../../utils/ApiError';

const handleErrors = (schema: mongoose.Schema<any>): void => {
  const handleE11000 = (error: any, _res: any, next: any) => {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors: any = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      next(new ApiError(409, `There was a validation error ${JSON.stringify(errors)}`, false));
    } else if (error.name === 'MongoServerError') {
      const field = Object.keys(error.keyValue);
      if (error.code === 11000) {
        next(new ApiError(409, `There was a duplicate key error for ${field}`, false));
      } else {
        next();
      }
    } else {
      next();
    }
  };

  schema.post('save', handleE11000);
  schema.post('updateOne', handleE11000);
  schema.post('update', handleE11000);
  schema.post('updateMany', handleE11000);
  schema.post('findOneAndUpdate', handleE11000);
  schema.post('insertMany', handleE11000);
};

export default handleErrors;
