import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { PUBLIC_ROUTES } from '../config/routes';
import { TokenRepository } from '../repository/auth_token';
import { env } from '../config/env';


export interface JWTPayload {
  id:                number;
  email:             string;
  walletAddress:     string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

const isPublicRoute = (req: Request): boolean => {
  return PUBLIC_ROUTES.some(
    (route) => route.path === req.path && route.method === req.method
  );
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  if (isPublicRoute(req)) return next();

  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res
      .status(403)
      .setHeader('x-error-type', 'JWT_INVALID')
      .json({ error: 'JWT_INVALID' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const tokenEntity = await TokenRepository.findByToken(token);

    if (!tokenEntity) {
      res
        .status(403)
        .setHeader('x-error-type', 'JWT_INVALID')
        .json({ error: 'JWT_INVALID' });
      return;
    }

    if (
      tokenEntity.expired ||
      (tokenEntity.expiresAt && tokenEntity.expiresAt < new Date())
    ) {
      await TokenRepository.update(tokenEntity.id, { expired: true });

      res
        .status(403)
        .setHeader('x-error-type', 'JWT_EXPIRED')
        .json({ error: 'JWT_EXPIRED' });
      return;
    }

    const decoded = jwt.verify(token, env.jwt.secret) as JWTPayload;
    req.user = decoded;

    next();

  } catch (err) {

    if (err instanceof jwt.TokenExpiredError) {
      res
        .status(403)
        .setHeader('x-error-type', 'JWT_EXPIRED')
        .json({ error: 'JWT_EXPIRED' });
      return;
    }

    if (err instanceof jwt.JsonWebTokenError) {
      res
        .status(403)
        .setHeader('x-error-type', 'JWT_INVALID')
        .json({ error: 'JWT_INVALID' });
      return;
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getTokenFromHeader = (req: Request): string => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('JWT_MISSING');
  }
  return authHeader.split(' ')[1];
};

export const decodeToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, env.jwt.secret as string) as JWTPayload;
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') throw new Error('JWT_EXPIRED');
    throw new Error('JWT_INVALID');
  }
};

export const getLoggedInUser = (req: Request): JWTPayload => {
  const token = getTokenFromHeader(req);
  return decodeToken(token);
};


