import { FormEvent, useState } from 'react'
import tw from 'twin.macro'
import { TLoginFields, ILoginFields, ILoginFormProps } from '@interfaces'
import TextInput from '../TextInput'
import Button from '../Button'
import { isEmail, isExists } from '../../utils/forms'

export default function LoginForm({ isLoading, onSubmit }: ILoginFormProps) {
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

    onSubmit(formData)
  }

  return (
    <Form role='form' onSubmit={onSubmitHandler}>
      <TextInput
        type='email'
        name='email'
        placeholder='Email'
        value={formData.email}
        errorMsg={errors.email}
        onChange={value => onChangeFormHandler('email', value)}
      />
      <TextInput
        type='password'
        name='password'
        placeholder='Password'
        value={formData.password}
        errorMsg={errors.password}
        onChange={value => onChangeFormHandler('password', value)}
      />
      <Button type='submit' text='LOG IN' isLoading={isLoading} />
    </Form>
  )
}

const Form = tw.form`
  w-full
  max-w-sm
  flex
  flex-col
  gap-2
`
