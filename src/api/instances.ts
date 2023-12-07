import axios from 'axios'
import Cookies from 'js-cookie'

const localInstance = axios.create({
  baseURL: 'http://localhost:3000'
})
localInstance.interceptors.request.use(config => {
  const token = Cookies.get('token')
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})


const pokeInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
})

export { localInstance, pokeInstance }
