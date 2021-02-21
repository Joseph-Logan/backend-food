import { celebrate, Joi, Segments } from 'celebrate'

// CONSTANTS
const email = Joi.string().required().regex(/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/)
const password = Joi.string().required().min(6).messages({'string.min': `"password" debe contener minimo 6 caracteres`})

// SCHEMAS
const schemaSignIn = Joi.object().keys({
  email,
  password
})

// VALIDATOR
const signInValidator = celebrate({
  [Segments.BODY]: schemaSignIn
})

export {
  signInValidator
}