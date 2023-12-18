import { IGetResponseErrorParams } from '@interfaces'

export const getResponseError = (error: IGetResponseErrorParams) => {
  return error.response?.data.msg || error.response?.data.errors?.[0].msg || error.message
}
