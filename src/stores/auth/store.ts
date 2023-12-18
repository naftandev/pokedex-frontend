import { StateCreator } from 'zustand'
import Cookies from 'js-cookie'
import { IAuthStore } from '@interfaces'
import { signup, login } from '@api'
import { getResponseError } from '@utils'

const store: StateCreator<IAuthStore> = (set) => ({
  signup: async data => {
    return new Promise((resolve, reject) => {
      signup(data)
        .then(({ data }) => {
          const { token, trainer } = data
          Cookies.set('token', token)
          set({ trainer })
          resolve()
        })
        .catch(error => {
          set({ trainer: undefined })
          reject(getResponseError(error))
        })
    })
  },
  login: async data => {
    return new Promise((resolve, reject) => {
      login(data)
        .then(({ data }) => {
          const { token, trainer } = data
          Cookies.set('token', token)
          set({ trainer })
          resolve()
        })
        .catch(error => {
          set({ trainer: undefined })
          reject(getResponseError(error))
        })
    })
  },
  logout: () => {
    if (Cookies.get('token')) Cookies.remove('token')
    set({ trainer: undefined })
  }
})

export default store
