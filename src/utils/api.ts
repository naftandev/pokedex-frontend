import { readFileSync } from 'fs'
import jwt from 'jsonwebtoken'
import { ITrainerData } from '@interfaces'

const DB_PATH = './src/db/users.json'
const secretOrPrivateKey = process.env.SECRET_OR_PRIVATE_KEY || ''

export const getUserByEmail = (email: string) => {
  const users = JSON.parse(readFileSync(DB_PATH, { encoding: 'utf-8' })) as ITrainerData[]
  const userIndex = users.findIndex(user => user.email === email)
  return users[userIndex]
}

export const generateJwt = (id: number) => {
  return new Promise((resolve, reject) => {
    const payload = { id }
    const options = { expiresIn: '7d' }

    jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
      if (err) reject('Error generating token')
      resolve(token)
    })
  })
}
