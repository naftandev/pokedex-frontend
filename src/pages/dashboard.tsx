import React, { SetStateAction, useEffect, useState } from 'react'
import tw from 'twin.macro'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { getPokemons } from '@api'
import { Pagination, PokemonCard, Spinner } from '@components'
import { IGetPokemonsResponse } from '@interfaces'

export default function Dashboard() {
  const { push } = useRouter()
  const [pokemons, setPokemons] = useState({} as IGetPokemonsResponse)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [error, setError] = useState<SetStateAction<string | null>>(null)
  const limit = 10

  const catchHandler = (msg: string) => {
    setError(msg)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg,
      willClose: () => {
        Cookies.remove('token')
        push('/login')
      }
    })
  }

  useEffect(() => {
    getPokemonsHandler()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const getPokemonsHandler = () => {
    setIsLoading(true)
    getPokemons(limit, limit * (page - 1))
      .then(({ data }) => setPokemons(data))
      .catch(error => {
        const { data } = error.response
        catchHandler(data.msg)
      })
      .finally(() => setIsLoading(false))
  }

  if (error) return null

  return (
    <Container>
      <CardsContainer data-cy='cards-container'>
        {!isLoading ? (
          pokemons.data?.map(pokemon => (
            <PokemonCard
              key={pokemon.id}
              picture={pokemon.picture}
              order={pokemon.order}
              height={pokemon.height / 10}
              name={pokemon.name}
              moves={pokemon.moves}
              stats={pokemon.stats}
              abilities={pokemon.abilities}
            />
          ))
        ) : <Spinner />}
      </CardsContainer>
      <Pagination
        total={pokemons.length || 0}
        max={Math.ceil(pokemons.length / limit) || 0}
        page={pokemons.data?.length ? page : 0}
        isDisabled={isLoading || !pokemons.data?.length}
        setPage={setPage}
      />
    </Container>
  )
}

const Container = tw.div`
  w-full
`

const CardsContainer = tw.div`
  w-full
  max-w-7xl
  min-h-[calc(100vh - 129px)]
  mx-auto
  flex
  gap-5
  flex-wrap
  px-5
  py-10
  justify-center
`
