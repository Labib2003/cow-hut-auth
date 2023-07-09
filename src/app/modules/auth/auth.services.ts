import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/users.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { jwtHelpers } from '../../../shared/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  //check user exists
  const user = new User();
  const isUserExists = await user.isUserExists(phoneNumber);

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
  }
  //match password
  if (
    isUserExists.password &&
    !user.isPasswordMatched(password, isUserExists?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { phoneNumber: number, role, needsPasswordChange } = isUserExists;
  // create access token(shortlife), refresh token(longlife)
  //access token

  const accessToken = jwtHelpers.createToken(
    { number, role },
    config.jwt.secret as Secret,
    { expiresIn: config.jwt.expires_in }
  );

  //refresh token
  const refreshToken = jwtHelpers.createToken(
    { number, role },
    config.jwt.refresh_secret as Secret,
    { expiresIn: config.jwt.refresh_expires_in }
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
    //in verifiedToken, we get user id, role, timestamps
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }
  const { number } = verifiedToken;
  //checking deleted user using refresh token
  //check user exists
  const user = new User();
  const isUserExists = await user.isUserExists(number);
  //if user does not exists
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  //generate new token
  const accessToken = jwtHelpers.createToken(
    { number: isUserExists?.phoneNumber, role: isUserExists?.role },
    config.jwt.secret as Secret,
    { expiresIn: config.jwt.expires_in }
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
