import bcrypt from 'bcrypt'

const validatePassword = async (passwordFromUser:string, passwordStoraged:string) => {
  try {
    return bcrypt.compareSync(passwordFromUser, passwordStoraged)
  } catch (err) {
    throw new Error('Opp has ocurred error, try again')
  }
}

const bcryptPassword = async (password: any) => {
  try {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  } catch (err) {
    throw new Error(err)
  }
}

const checkPassword = async (data: { hasOwnProperty: (arg0: string) => any }) => {
  if (data.hasOwnProperty('password')) {
    return true
  }
  return false
}


const deletePasswordInObject = async (data: any) => {
  let doc = {
    ...data._doc
  }
  delete doc.password
  return doc
}

export {
  validatePassword,
  bcryptPassword,
  checkPassword,
  deletePasswordInObject
}

