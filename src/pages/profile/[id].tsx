import { useRouter } from 'next/router'
import tw from 'twin.macro'
import { useStore } from '@hooks'
import { useAuthStore } from '@stores'

export default function UserProfile() {
  const { query: { id } } = useRouter()
  const user = useStore({ store: useAuthStore, callback: state => state.user })
  const trainerExists = user?.id === Number(id)

  return (
    <Container>
      <ProfileContainer>
        {trainerExists ? (
          <>
            <Title>Hi, trainer!</Title>
            <AvatarContainer>
              <Avatar src={user.avatar} alt={user.name} />
            </AvatarContainer>
            <ProfileInfoContainer>
              <InfoName>Name</InfoName>
              <InfoValue>{user.name}</InfoValue>
            </ProfileInfoContainer>
            <ProfileInfoContainer>
              <InfoName>Lastname</InfoName>
              <InfoValue>{user.lastname}</InfoValue>
            </ProfileInfoContainer>
            <ProfileInfoContainer>
              <InfoName>Email</InfoName>
              <InfoValue>{user.email}</InfoValue>
            </ProfileInfoContainer>
            <ProfileInfoContainer>
              <InfoName>City</InfoName>
              <InfoValue>{user.city}</InfoValue>
            </ProfileInfoContainer>
            <ProfileInfoContainer>
              <InfoName>Captured pokemons</InfoName>
              <InfoValue>{user.captured}</InfoValue>
            </ProfileInfoContainer>
          </>
        ) : (
          <Title>Trainer not found</Title>
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
