import { FormEvent, useState } from 'react'
import tw from 'twin.macro'
import { ISignupFields, ISignupFormProps, TGender, TSignupFields } from '@interfaces'
import TextInput from '../TextInput'
import Selector from '../Selector'
import Button from '../Button'
import { isEmail, isExists } from '../../utils/forms'

export default function SignupForm({ isLoading, onSubmit }: ISignupFormProps) {
  const [formData, setFormData] = useState({} as ISignupFields)
  const [errors, setErrors] = useState({} as Record<string, string>)

  const onChangeFormHandler = (type: TSignupFields, value: string) => {
    if (errors[type]) setErrors(prevState => ({ ...prevState, [type]: '' }))

    switch (type) {
      case 'name':
        setFormData(prevState => ({ ...prevState, name: value }))
        break
      case 'lastname':
        setFormData(prevState => ({ ...prevState, lastname: value }))
        break
      case 'email':
        setFormData(prevState => ({ ...prevState, email: value }))
        break
      case 'password':
        setFormData(prevState => ({ ...prevState, password: value }))
        break
      case 'confirmPassword':
        setFormData(prevState => ({ ...prevState, confirmPassword: value }))
        break
      case 'gender':
        setFormData(prevState => ({ ...prevState, gender: value as TGender }))
        break
      case 'region':
        setFormData(prevState => ({ ...prevState, region: value }))
        break
      case 'city':
        setFormData(prevState => ({ ...prevState, city: value }))
        break
      default:
        break
    }
  }

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { name, lastname, email, password, confirmPassword, gender, region, city } = formData
    const errors = {} as Record<string,string>

    if (!isExists(name)) errors.name = 'The name is required'
    if (!isExists(lastname)) errors.lastname = 'The last name is required'
    if (isExists(email)) {
      if (!isEmail(email)) errors.email= 'The email is invalid'
    } else {
      errors.email= 'The email is required'
    }
    if (!isExists(password)) errors.password= 'The password is required'
    if (!isExists(confirmPassword) || password !== confirmPassword) {
      errors.confirmPassword= 'The passwords do not match'
    }
    if (!isExists(gender)) errors.gender = 'The gender is required'
    if (!isExists(region)) errors.region = 'The region is required'
    if (!isExists(city)) errors.city = 'The city is required'

    if (Object.keys(errors).length) return setErrors(errors)

    onSubmit({ name, lastname, email, password, gender, region, city })
  }

  return (
    <Form role='form' onSubmit={onSubmitHandler}>
      <Section>
        <TextInput
          type='text'
          name='name'
          placeholder='Name'
          value={formData.name}
          errorMsg={errors.name}
          onChange={value => onChangeFormHandler('name', value)}
        />
        <TextInput
          type='text'
          name='lastname'
          placeholder='Last name'
          value={formData.lastname}
          errorMsg={errors.lastname}
          onChange={value => onChangeFormHandler('lastname', value)}
        />
      </Section>
      <TextInput
        type='email'
        name='email'
        placeholder='Email'
        value={formData.email}
        errorMsg={errors.email}
        onChange={value => onChangeFormHandler('email', value)}
      />
      <Section>
        <TextInput
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          errorMsg={errors.password}
          onChange={value => onChangeFormHandler('password', value)}
        />
        <TextInput
          type='password'
          name='confirmPassword'
          placeholder='Confirm password'
          value={formData.confirmPassword}
          errorMsg={errors.confirmPassword}
          onChange={value => onChangeFormHandler('confirmPassword', value)}
        />
      </Section>
      <Selector
        placeholder='Gender'
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' }
        ]}
        errorMsg={errors.gender}
        onChange={({ name }) => onChangeFormHandler('gender', name)}
      />
      <Section>
        <TextInput
          type='text'
          name='region'
          placeholder='Region'
          value={formData.region}
          errorMsg={errors.region}
          onChange={value => onChangeFormHandler('region', value)}
        />
        <TextInput
          type='text'
          name='city'
          placeholder='City'
          value={formData.city}
          errorMsg={errors.city}
          onChange={value => onChangeFormHandler('city', value)}
        />
      </Section>
      <Button type='submit' text='SIGN UP' isLoading={isLoading} />
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

const Section = tw.div`
  w-full
  flex
  gap-2
  justify-evenly
  items-center
`
