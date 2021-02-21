/**
 * Validate the responses and return the specific structure for each catch
 */
class HandlerValidator {

  private OBJECT = 'object'

  private isArray(object: any) {
    return Array.isArray(object)
  }

  private isObject(object: any) {
    return typeof object === this.OBJECT
  }

  public async serializeErrors(object: any) {
    try {
      // controlling arrays with strings and objects
      if (this.isArray(object)) {
        return await this.handlerArraysResponse(object)
      }

      if (this.isObject(object)) {
        return await this.handlerObjectsResponse(object)
      }

      return await this.handlerAnyError(object)
    } catch (err) {
      return await this.handlerAnyError(err)
    }
  }

  private async handlerObjectsResponse(object: any) {
    return {
      errors: [{
        message: object?.message || null,
        ...object
      }]
    }
  }

  private async handlerArraysResponse(object: any) {
    let errors = [];
    // Analize if the content array is object or string
    let firstElement = object[0]

    if (this.isObject(firstElement)) {
      errors = object.map((error: any) => {
        return {
          message: error?.message || null,
          ...error
        }
      })
    } else {
      errors = object.map((error: any) => {
        return {
          message: error
        }
      })
    }
    return {
      errors
    }
  }

  private async handlerAnyError(object: any) {
    return {
      errors: [{ message: object }]
    }
  }
}

export const handlerValidator = new HandlerValidator()