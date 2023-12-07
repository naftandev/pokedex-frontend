import { useRouter } from 'next/router'
import tw from 'twin.macro'
import { Pokeball, Button } from '@components'

export default function Home() {
  const { push } = useRouter()

  return (
    <Container>
      <ImageContainer>
        <Image src='/images/login-wallpaper.webp' alt='Pokemon landscape' />
      </ImageContainer>
      <SideContainer>
        <Pokeball direction='column' theme='dark' />
        <Button type='button' text='Catch them now!' onClick={() => push('/login')} />
      </SideContainer>
    </Container>
  )
}

const Container = tw.div`
  w-screen
  h-screen
  grid
  grid-cols-3
`

const ImageContainer = tw.figure`
  flex
  col-start-1
  col-end-3
`

const Image = tw.img`
  w-full
  h-full
`

const SideContainer = tw.div`
  w-full
  h-full
  col-start-3
  col-end-4
  flex
  flex-col
  gap-5
  items-center
  justify-center
  px-10
  bg-secondary-color
`
