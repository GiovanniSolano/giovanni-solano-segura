import { Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import config from '@config/index';
import { HttpStatusCode } from '@shared/constants';
import { ResponseUtil } from '@shared/utils';
import { UserLoggedInDto } from '@features/auth/dto/request';
import { AuthenticatedRequest } from '@shared/interfaces';

/**
 * Verifies a JWT token and returns the decoded payload.
 * @param token - The JWT token to be verified.
 * @returns A promise that resolves to the decoded payload if the token is valid, or null if it is not.
 */
function verifyToken(token: string): Promise<UserLoggedInDto | null> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret_key, (err: VerifyErrors | null, decoded: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded || null);
      }
    });
  });
}

/**
 * Middleware function to authenticate JWT tokens.
 * @param req - The request object, which will be enhanced with user information if the token is valid.
 * @param res - The response object, used to send error responses if the token is missing or invalid.
 * @param next - The next middleware function in the stack.
 */
export const authenticateJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {

  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return ResponseUtil.toErrorResponse(res, 'Unauthorized', '', HttpStatusCode.UNAUTHORIZED);
  }

  try {

    const user = await verifyToken(token);

    if (!user) {
      return ResponseUtil.toErrorResponse(res, 'Unauthorized', '', HttpStatusCode.UNAUTHORIZED);
    }

    (req as any).user = user as UserLoggedInDto;

    next();

  } catch (error) {
    console.error('Token verification error:', error);
    return ResponseUtil.toErrorResponse(res, 'Unauthorized', '', HttpStatusCode.UNAUTHORIZED);
  }

};
