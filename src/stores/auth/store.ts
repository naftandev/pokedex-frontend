import { StateCreator } from 'zustand'
import Cookies from 'js-cookie'
import { IAuthStore } from '@interfaces'
import { login } from '@api'

const store: StateCreator<IAuthStore> = (set) => ({
  login: async ({ email, password }) => {
    return new Promise((resolve, reject) => {
      login({email, password})
        .then(({ data }) => {
          const { token, user } = data
          Cookies.set('token', token)
          set({ user })
          resolve()
        })
        .catch(error => {
          const { data } = error.response
          set({ user: undefined })
          reject(data.msg)
        })
    })
  },
  logout: () => {
    if (Cookies.get('token')) Cookies.remove('token')
    set({ user: undefined })
  }
})

export default store
