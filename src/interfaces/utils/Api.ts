import { AxiosError } from 'axios'

export interface IGetResponseErrorParams extends AxiosError<IResponseData> {}

interface IResponseData {
  msg?: string
  errors?: IField[]
}

interface IField {
  location: string
  msg: string
  path: string
  type: string
  value: string
}
