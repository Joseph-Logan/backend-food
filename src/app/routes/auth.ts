import { Router, Request, Response, NextFunction } from 'express';
import Logger from '../../loaders/logger';
import { User } from '../models'

const route: Router = Router();

export default (app: Router) => {  
  app.use('/auth', route);

  route.post(
    '/sign-in', 
    async (req: Request, res: Response, next: NextFunction) => {
      Logger.debug('Calling Sign In endpoint with body: %o', req.body)
      try {
        return res.send('sign in')
      } catch (err) {
        Logger.error('🔥 error: %o', err);
        return next(err);
      }
    }
  )

  route.post(
    '/sign-up',
    async (req: Request, res: Response, next: NextFunction) => {
      Logger.debug('Calling Sign Up endpoint with body: %o', req.body)
      try {
        let data = req.body
        let user = new User(data)
        
        let userRegistered = await user.save()
        return res.json(userRegistered)
      } catch (err) {
        Logger.error('🔥 error: %o', err);
        return next(err);
      }
    }
  )

  route.post(
    '/logout',
    async (req: Request, res: Response, next: NextFunction) => {
      Logger.debug('Calling Logout endpoint with body: %o')
      try {
        return res.status(200).end();
      } catch (err) {
        Logger.error('🔥 error: %o', err);
        return next(err);
      }
    }
  )
}