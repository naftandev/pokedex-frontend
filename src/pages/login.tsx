import { useState } from 'react'
import tw from 'twin.macro'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { LoginForm } from '@components'
import { ILoginFields } from '@interfaces'
import { useAuthStore } from '@stores'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const login = useAuthStore(state => state.login)
  const { push } = useRouter()

  const catchHandler = (msg: string) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg
    })
  }

  const loginHandler = (data: ILoginFields) => {
    setIsLoading(true)
    login(data)
      .then(() => push('/dashboard'))
      .catch(catchHandler)
      .finally(() => setIsLoading(false))
  }

  return (
    <Container>
      <ImageContainer>
        <Image src='/images/login-wallpaper.webp' alt='Pokemon landscape' />
      </ImageContainer>
      <FormContainer>
        <LoginForm isLoading={isLoading} onClick={loginHandler} />
      </FormContainer>
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

const FormContainer = tw.div`
  w-full
  h-full
  col-start-3
  col-end-4
  flex
  items-center
  justify-center
  px-10
  py-5
  bg-secondary-color
`
