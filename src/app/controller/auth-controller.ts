import { Models } from '@app/models'
import { validatePassword, deletePasswordInObject } from '@services/password'
import { INVALID_CREDENTIALS } from '@utils/string'
import { createToken } from '@services/handle-token'

class AuthController {

  private firstRecord = 0
  private static user: any;

  /**
   * @returns Token Session, User
   */
  public async signIn({ email, password }: any) {
    let validateCredentials: boolean = await this.validateCredentials(email, password)
    if (!validateCredentials)
      throw INVALID_CREDENTIALS

    return this.getCurrentUserAuthenticated()
  }

  /**
   * @param data { name, firstSurname, secondSurname, dni, email, password, role_name }
   * @returns user
   */
  public async signUp (data: any) {
    let user = new Models.User(data)
    return await user.save()
  }

  /**
   * @param email
   * @param password
   * @returns Boolean 
   */
  private async validateCredentials (email: string, password: string) {
    let user: any = await this.findUserByEmail(email)
    AuthController.user = user
    return await validatePassword(password, user.password)
  }
  
  /**
   * @param email
   * @returns User
   */
  private async findUserByEmail (email: string) {
    let user = await Models.User.find({ email, isEnabled: true }).populate('role')

    if (user.length === this.firstRecord)
      throw INVALID_CREDENTIALS

    return user[this.firstRecord]
  }

  /**
   * Delete field password from user object
   * create token based on user got it in authentication process
   * @returns Object { user with token }
   */
  private async getCurrentUserAuthenticated () {
    let data = AuthController.user
    let user = await deletePasswordInObject(data)

    return {
      user,
      token: await createToken(user)
    }
  }
}

export default AuthController