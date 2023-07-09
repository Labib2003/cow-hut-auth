/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './users.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

export const UserSchema = new Schema<
  IUser,
  Record<string, never>,
  IUserMethods
>(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
    },
    income: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

//instance method to create function
UserSchema.methods.isUserExists = async function (
  phoneNumber: string
): Promise<Partial<IUser> | null> {
  const user = User.findOne(
    { phoneNumber },
    { id: 1, password: 1, needsPasswordChange: 1, role: 1, phoneNumber: 1 }
  );
  return user;
};

//instance method to create function
UserSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.pre('save', async function (next) {
  // hash user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
