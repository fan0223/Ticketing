import { Request, Response, NextFunction } from 'express'
import { NotAuthurizedError } from '../erors/not-authorized-error'

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthurizedError()
  }
  next()
}