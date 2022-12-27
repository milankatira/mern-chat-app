import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import userModel from '../src/user/user.model';

export const protect = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {

      try {

        token = req.headers.authorization.split(' ')[1];

        // decodes token id
        const decoded: any = jwt.verify(
          token,
          process.env.JWT_SECRET || 'hello',
        );

        req.user = await userModel.findById(decoded.id).select('-password');

        next();

      } catch (error) {

        res.status(401);
        throw new Error('Not authorized, token failed');

      }

    }

    if (!token) {

      res.status(401);
      throw new Error('Not authorized, no token');

    }

  },
);
