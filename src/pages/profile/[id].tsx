import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import tw from 'twin.macro'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { ITrainerData } from '@interfaces'
import { getTrainer } from '@api'
import { Spinner } from '@components'
import { getResponseError } from '@utils'

export default function UserProfile() {
  const { push, query: { id } } = useRouter()
  const [trainer, setTrainer] = useState<ITrainerData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (id) getTrainerHandler()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const getTrainerHandler = () => {
    setIsLoading(true)
    getTrainer(id as string)
      .then(({ data }) => setTrainer(data))
      .catch(error => catchHandler(getResponseError(error)))
      .finally(() => setIsLoading(false))
  }

  const catchHandler = (msg: string) => {
    setErrorMsg(msg)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg,
      willClose: () => {
        if (msg === 'Invalid authorization token') {
          Cookies.remove('token')
          push('/login')
        }
      }
    })
  }

  if (errorMsg) return null

  return (
    <Container>
      <Head>
        <title>Pokedex | Profile</title>
      </Head>
      <ProfileContainer>
        {!isLoading ? (
          trainer ? (
            <>
              <Title data-cy='profile-title'>Hi, trainer!</Title>
              <AvatarContainer>
                <Avatar
                  src={trainer.avatar || '/images/avatars/default-silhouette.png'}
                  alt={trainer.name}
                />
              </AvatarContainer>
              <ProfileInfoContainer>
                <InfoName>Name</InfoName>
                <InfoValue>{trainer.name}</InfoValue>
              </ProfileInfoContainer>
              <ProfileInfoContainer>
                <InfoName>Lastname</InfoName>
                <InfoValue>{trainer.lastname}</InfoValue>
              </ProfileInfoContainer>
              <ProfileInfoContainer>
                <InfoName>Email</InfoName>
                <InfoValue>{trainer.email}</InfoValue>
              </ProfileInfoContainer>
              <ProfileInfoContainer>
                <InfoName>Gender</InfoName>
                <InfoValue>{trainer.gender}</InfoValue>
              </ProfileInfoContainer>
              <ProfileInfoContainer>
                <InfoName>Region</InfoName>
                <InfoValue>{trainer.region}</InfoValue>
              </ProfileInfoContainer>
              <ProfileInfoContainer>
                <InfoName>City</InfoName>
                <InfoValue>{trainer.city}</InfoValue>
              </ProfileInfoContainer>
              <ProfileInfoContainer>
                <InfoName>Captured pokemons</InfoName>
                <InfoValue>{trainer.captured || 0}</InfoValue>
              </ProfileInfoContainer>
            </>
          ) : null
        ) : (
          <Spinner />
        )}
      </ProfileContainer>
    </Container>
  )
}

const Container = tw.div`
  w-full
  max-w-7xl
  mx-auto
  px-5
  py-10
  justify-center
`

const ProfileContainer = tw.div`
  flex
  flex-col
  gap-8
  rounded
  p-5
`

const Title = tw.strong`
  text-2xl
  text-center
  text-primary-color
`

const AvatarContainer = tw.figure`
  flex
  justify-center
  items-center
`

const Avatar = tw.img`
  rounded-full
  w-52
  h-52
`

const ProfileInfoContainer = tw.div`
  flex
  flex-col
  gap-2
  items-center
`

const InfoName = tw.p`
  text-xl
  font-semibold
  text-primary-color
`

const InfoValue = tw.p`
  text-xl
  text-primary-color
`
