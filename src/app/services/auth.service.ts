import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { sign, verify, decode } from 'jsonwebtoken';
import { RefreshToken } from '../models/refreshToken.model';
import { User } from '../models/user.model';

export async function encryptPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function validatePassword(
  incomingPassword: string,
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(incomingPassword, password);
}

export function createToken(userId: number): string {
  const token = sign({}, process.env.TKEY, {
    subject: userId.toString(),
    expiresIn: '10s',
  });
  return token;
}

export function validadeToken(token: string): boolean {
  try {
    verify(token, process.env.TKEY);
    return true;
  } catch (error) {
    return false;
  }
}

export function decodeToken(token: string) {
  const { sub } = decode(token);
  return sub;
}

export async function gererateRefreshToken(user: User) {
  const expiresIn = dayjs().add(60, 'second').unix();
  const hasRefreshToken = await RefreshToken.findOneBy({ user: user });
  if (hasRefreshToken) {
    return await RefreshToken.update(
      { uuid: hasRefreshToken.uuid },
      {
        expiresIn: expiresIn,
      },
    );
  } else {
    return await RefreshToken.insert({
      user: user,
      expiresIn: expiresIn,
    });
  }
}

export async function verifyRefreshTokenExpired(userId: number) {
  const refreshToken = await RefreshToken.findOneBy({ user: { id: userId } });
  if (refreshToken) {
    return dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));
  } else {
    return true;
  }
}
