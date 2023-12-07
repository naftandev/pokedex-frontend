import type { NextApiRequest, NextApiResponse } from 'next'
import { generateJwt, getUserByEmail } from '@utils'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(400).json({ msg: 'Incorrect request method' })

  const { email, password } = req.body

  try {
    const user = getUserByEmail(email)

    if (user?.email !== email || user?.password !== password) {
      return res.status(400).json({ msg: 'The email or password is incorrect' })
    }

    const token = await generateJwt(user.id)

    setTimeout(() => {
      res.status(200).json({ token, user })
    }, 1000)
  } catch (error) {
    res.status(500).json({ msg: 'Error to create the authentication' })
  }
}
