import {
  AuthTokenResult,
  IUseToken,
} from 'src/modules/auth/interfaces/auth.interfaces';
import * as jwt from 'jsonwebtoken';
export function useToken(token: string): IUseToken | string {
  try {
    const decode = jwt.decode(token) as unknown as AuthTokenResult;

    const currentDate = new Date();
    const expiresDate = new Date(decode.exp);

    return {
      sub: decode.sub,
      role: decode.role,
      isExpired: +expiresDate <= +currentDate / 1000,
    };
  } catch (error) {
    return 'Token is invalid';
  }
}
