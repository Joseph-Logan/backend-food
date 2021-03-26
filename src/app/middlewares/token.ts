import { Response, Request, NextFunction } from 'express'
import { verify, sign, decode } from 'jsonwebtoken'
import { handlerValidator } from '@app/validator'
import config from '@config'

import { FORBIDEN } from '@utils/codes'

const validateActiveAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let getTokenValidated = await isValidToken(req)

    verify(getTokenValidated, config.SECRET_KEY)
    next()
  } catch (err) {
    return res.status(FORBIDEN).send(await handlerValidator.serializeErrors(err))
  }
}

const isValidToken = async (req: Request) => {
  const token = req.header('Authorization')
  if (!token) {
    throw 'Forbidden'
  }
  return token
}

const createToken = async (data: any) => {
  try {
    const token = sign({
      data,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, config.SECRET_KEY)

    return token
  } catch (err) {
    throw err
  }
}

const decryptToken = (token: any) => {
  try {
    let data = decode(token, {
      complete: true
    })

    return data
  } catch (err) {
    throw err
  }
}

export {
  validateActiveAuth,
  createToken,
  decryptToken,
  isValidToken
}