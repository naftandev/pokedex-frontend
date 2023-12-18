import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import tw from 'twin.macro'
import { SignupForm, Logo } from '@components'
import { ISignupData } from '@interfaces'
import { useAuthStore } from '@stores'
import Link from 'next/link'

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false)
  const signup = useAuthStore(state => state.signup)
  const { push } = useRouter()

  const catchHandler = (msg: string) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg
    })
  }

  const onSubmitHandler = (data: ISignupData) => {
    setIsLoading(true)
    signup(data)
      .then(() => push('/dashboard'))
      .catch(catchHandler)
      .finally(() => setIsLoading(false))
  }

  return (
    <Container>
      <Head>
        <title>Pokedex | Sign Up</title>
      </Head>
      <ImageContainer>
        <Image src='/images/login-wallpaper.webp' alt='Pokemon landscape' />
      </ImageContainer>
      <FormContainer>
        <Logo direction='column' theme='dark' />
        <SignupForm isLoading={isLoading} onSubmit={onSubmitHandler} />
        <Link href='/login'>
          <LinkText>Log In</LinkText>
        </Link>
      </FormContainer>
    </Container>
  )
}

const Container = tw.div`
  w-screen
  h-screen
  grid
  grid-cols-1
  lg:grid-cols-3
`

const ImageContainer = tw.figure`
  hidden
  col-start-1
  col-end-3
  lg:flex
`

const Image = tw.img`
  w-full
  h-full
`

const FormContainer = tw.div`
  w-full
  h-full
  col-start-1
  col-end-2
  flex
  flex-col
  gap-8
  items-center
  justify-center
  px-10
  py-5
  bg-secondary-color
  lg:col-start-3
  lg:col-end-4
`

const LinkText = tw.p`
  font-medium
  text-primary-color
  hover:text-teal-700
`
