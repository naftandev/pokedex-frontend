import { useState } from 'react'
import tw from 'twin.macro'
import { ITextInputProps } from '@interfaces'

export default function TextInput({ type, placeholder, value = '', errorMsg, onChange }: ITextInputProps) {
  const [isValueVisible, setIsValueVisible] = useState(false)

  const toggleValueVisible = () => setIsValueVisible(prevState => !prevState)

  return (
    <Container>
      <InputContainer>
        <InputField
          type={isValueVisible ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={({ target: { value } }) => onChange(value)}
        />
        {type === 'password' ? (
          <IconContainer role='button' data-cy='toggle-type-btn' onClick={toggleValueVisible}>
            {!isValueVisible ? (
              <Icon src='/icons/icon-hide-grey.svg' alt='Hide' />
            ) : (
              <Icon src='/icons/icon-show-grey.svg' alt='Show' />
            )}
          </IconContainer>
        ) : null}
        {value ? (
          <IconContainer data-cy={`clean-btn-${type}`} role='button' onClick={() => onChange('')}>
            <Icon tw='w-3 h-3' src='/icons/icon-close-grey.svg' alt='Clean' />
          </IconContainer>
        ) : null}
      </InputContainer>
      {errorMsg ? <ErrorMsg data-cy={`error-msg-${type}`}>{errorMsg}</ErrorMsg> : null}
    </Container>
  )
}

const Container = tw.div``

const InputContainer = tw.div`
  w-full
  flex
  gap-2
  border
  border-solid
  border-gray-300
  rounded
  px-2
  py-1
  items-center
`


const InputField = tw.input`
  w-full
  outline-0
  text-sm
  text-primary-color
`

const IconContainer = tw.figure`
  flex
  cursor-pointer
`

const Icon = tw.img`
  w-5
  h-5
`

const ErrorMsg = tw.p`
  text-xs
  text-red-400
`
