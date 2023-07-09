import { Model } from 'mongoose';

export type IUser = {
  name: {
    firstName: string;
    lastName: string;
  };
  password: string;
  needsPasswordChange: true | false;
  role: 'buyer' | 'seller' | 'admin';
  phoneNumber: string;
  address: string;
  budget?: number;
  income?: number;
};

//created an instance method
export type IUserMethods = {
  isUserExists(id: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type IUserFilters = {
  searchTerm?: string;
};
