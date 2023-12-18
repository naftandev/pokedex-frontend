const endpoints = {
  signup: '/auth/signup',
  login: '/auth/login',
  pokemons: '/pokemons?limit={{limit}}&offset={{offset}}',
  trainerById: '/trainers/:id'
}

export default endpoints
