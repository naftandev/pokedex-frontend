import Head from 'next/head'
import { useRouter } from 'next/router'
import tw from 'twin.macro'
import { Logo, Button } from '@components'

export default function Home() {
  const { push } = useRouter()

  return (
    <Container>
      <Head>
        <title>Pokedex | Home</title>
      </Head>
      <ImageContainer>
        <Image src='/images/login-wallpaper.webp' alt='Pokemon landscape' />
      </ImageContainer>
      <SideContainer>
        <Logo direction='column' theme='dark' />
        <Button type='button' text='Catch them now!' onClick={() => push('/login')} />
      </SideContainer>
    </Container>
  )
}

const Container = tw.div`
  w-screen
  h-screen
  grid
  grid-cols-1
  md:grid-cols-3
`

const ImageContainer = tw.figure`
  hidden
  col-start-1
  col-end-3
  md:flex
`

const Image = tw.img`
  w-full
  h-full
`

const SideContainer = tw.div`
  w-full
  h-full
  col-start-1
  col-end-2
  flex
  flex-col
  gap-5
  items-center
  justify-center
  px-10
  bg-secondary-color
  md:col-start-3
  md:col-end-4
`
