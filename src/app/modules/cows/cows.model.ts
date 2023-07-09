import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cows.interface';
import { breeds, categories, labels, locations } from './cows.constants';

export const CowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      enum: locations,
      required: true,
    },
    breed: {
      type: String,
      enum: breeds,
      required: true,
    },
    label: {
      type: String,
      enum: labels,
      required: true,
    },
    category: {
      type: String,
      enum: categories,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cow = model<ICow, CowModel>('Cow', CowSchema);
