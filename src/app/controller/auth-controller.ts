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
    try {
      let validateCredentials: boolean = await this.validateCredentials(email, password)

      if (validateCredentials) {
        return this.getCurrentUserAuthenticated()
      }

      throw INVALID_CREDENTIALS
    } catch (error) {
      throw error
    }
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

    if (user.length === this.firstRecord) {
      throw INVALID_CREDENTIALS
    }
    return user[this.firstRecord]
  }

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