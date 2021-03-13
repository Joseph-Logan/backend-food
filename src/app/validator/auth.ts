import { celebrate, Joi, Segments } from 'celebrate'
import config from '@config'
// CONSTANTS
const email = Joi.string().required().regex(/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/)
const password = Joi.string().required().min(6).messages({'string.min': `"password" debe contener minimo 6 caracteres`})

// SCHEMAS
const schemaSignIn = Joi.object().keys({
  email,
  password
})

const schemaSignUp = Joi.object().keys({
  name: Joi.string().required().min(2).max(50),
  firstSurname: Joi.string().required().min(2).max(50),
  secondSurname: Joi.string().optional().min(2).max(50),
  dni: Joi.string().required().regex(/^[0-9]{9,11}$/),
  email,
  password,
  role: Joi.string().optional().default(config.roleClientDefault)
})

// VALIDATOR
const signInValidator = celebrate({
  [Segments.BODY]: schemaSignIn
})

const signUpValidator = celebrate({
  [Segments.BODY]: schemaSignUp
})

export {
  signInValidator,
  signUpValidator
}