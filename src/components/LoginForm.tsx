import { FormEvent, useState } from 'react'
import tw from 'twin.macro'
import { TLoginFields, ILoginFields, ILoginFormProps } from '@interfaces'
import { Button, Pokeball, TextInput } from '@components'
import { isEmail, isExists } from '@utils'

export default function LoginForm({ isLoading, onClick }: ILoginFormProps) {
  const [formData, setFormData] = useState({} as ILoginFields)
  const [errors, setErrors] = useState({} as Record<string, string>)

  const onChangeFormHandler = (type: TLoginFields, value: string) => {
    if (errors[type]) setErrors(prevState => ({ ...prevState, [type]: '' }))

    switch (type) {
    case 'email':
      setFormData(prevState => ({ ...prevState, email: value }))
      break
    case 'password':
      setFormData(prevState => ({ ...prevState, password: value }))
      break
    default:
      break
    }
  }

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { email, password } = formData
    const errors = {} as Record<string,string>

    if (isExists(email)) {
      if (!isEmail(email)) errors.email= 'The email is invalid'
    } else {
      errors.email= 'The email is required'
    }
    if (!isExists(password)) errors.password= 'The password is required'

    if (Object.keys(errors).length) return setErrors(errors)

    onClick(formData)
  }

  return (
    <Container>
      <Pokeball direction='column' theme='dark' />
      <Form onSubmit={onSubmitHandler}>
        <TextInput
          type='email'
          placeholder='Email'
          value={formData.email}
          errorMsg={errors.email}
          onChange={value => onChangeFormHandler('email', value)}
        />
        <TextInput
          type='password'
          placeholder='Password'
          value={formData.password}
          errorMsg={errors.password}
          onChange={value => onChangeFormHandler('password', value)}
        />
        <Button type='submit' text='LOGIN' isLoading={isLoading} />
      </Form>
    </Container>
  )
}

const Container = tw.div`
  w-full
  flex
  flex-col
  gap-1
  items-center
`

const Form = tw.form`
  w-full
  flex
  flex-col
  gap-2
  mt-8
`
