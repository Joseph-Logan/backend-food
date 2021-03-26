import { Router, Request, Response, NextFunction } from 'express';
import Logger from '@loaders/logger';
import { signInValidator, signUpValidator, handlerValidator } from '@app/validator'
import { AuthController } from '@app/controller'
import { SERVER_ERROR, BAD_REQUEST } from '@utils/codes'
import { ROUTE_AUTH } from '@utils/rest-routes'
import { tokenMiddleware } from '@app/middlewares'

const route: Router = Router();

export default (app: Router) => {
  // GET INSTANCE OF AUTH_CONTROLLER
  const authController = new AuthController();

  app.use(ROUTE_AUTH.prefixRoute, route);

  // Sign In action receive 2 params
  // Create a rest routes prefix 
  // Handle validator middleware to validate content of request 
  route.post(
    ROUTE_AUTH.signIn,
    signInValidator,
    async (req: Request, res: Response) => {
      Logger.debug('Calling Sign In endpoint with body: %o', req.body)
      try {
        let { email, password } = req.body
        let response = await authController.signIn({ email, password })

        return res.json(response)
      } catch (err) {
        Logger.error('🔥 error: %o', err);
        return res.status(SERVER_ERROR).json(await handlerValidator.serializeErrors(err))
      }
    }
  )
  
  // Sign Up to register any type of user
  // Handle validator middleware to validate content of request 
  route.post(
    ROUTE_AUTH.signUp,
    signUpValidator,
    async (req: Request, res: Response) => {
      Logger.debug('Calling Sign Up endpoint with body: %o', req.body)
      try {
        let data = req.body
        let response = await authController.signUp(data)

        return res.json(response)
      } catch (err) {
        Logger.error('🔥 error: %o', err);
        return res.status(SERVER_ERROR).json(await handlerValidator.serializeErrors(err))
      }
    }
  )

  route.post(
    ROUTE_AUTH.logOut,
    tokenMiddleware.validateActiveAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      Logger.debug('Calling Logout endpoint with body: %o')
      try {
        const token = await tokenMiddleware.isValidToken(req)
        await authController.logOut(token)
        return res.end();
      } catch (err) {
        Logger.error('🔥 error: %o', err);
        return next(err);
      }
    }
  )
  /**
   * Handle Errors from celebrate
   */
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    let errors: any = []
     //if joi produces an error, it's likely a client-side problem
    if (error.details) {
      error.details.forEach((element: any) => {
        let item = element.details[0]
        errors.push({
          message: item.message,
          field: item.context.key
        })
      })
      return res.status(BAD_REQUEST).json({
        errors
      })
    }
    //otherwise, it's probably a server-side problem.  
    return res.status(SERVER_ERROR).send(error)
  });
}