import { SignJWT, jwtVerify } from 'jose'
import { readFileSync } from 'fs'
import { ITrainerData } from '@interfaces'

const DB_PATH = './src/db/users.json'
const SECRET_OR_PRIVATE_KEY = process.env.SECRET_OR_PRIVATE_KEY || ''

export const getUserByEmail = (email: string) => {
  const users = JSON.parse(readFileSync(DB_PATH, { encoding: 'utf-8' })) as ITrainerData[]
  const userIndex = users.findIndex(user => user.email === email)
  return users[userIndex]
}

export const generateJwt = async (id: number) => {
  const JWT = new SignJWT({ id })
  const enconder = new TextEncoder()

  try {
    return await JWT
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(enconder.encode(SECRET_OR_PRIVATE_KEY))
  } catch (error) {
    throw new Error('Error creating authorization')
  }
}

export const verifyJwt = async (token: string) => {
  const enconder = new TextEncoder()

  try {
    const { payload } =  await jwtVerify(token, enconder.encode(SECRET_OR_PRIVATE_KEY))
    return  payload
  } catch (error) {
    throw new Error('Invalid authorization token')
  }
}
