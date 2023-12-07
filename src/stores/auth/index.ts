import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IAuthStore } from '@interfaces'
import store from './store'

const useAuthStore = create<IAuthStore>()(
  persist(
    store,
    { name: 'auth-storage' }
  )
)

export default useAuthStore
