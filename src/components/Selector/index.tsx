import { useState } from 'react'
import tw, { styled } from 'twin.macro'
import { IIconProps, IOption, ISelectorProps, ITextProps } from '@interfaces'

export default function Selector({ value, placeholder, options, errorMsg, onChange }: ISelectorProps) {
  const [isOpenOptions, setIsOpenOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState<IOption | null>(options.find(option => option.value === value) || null)

  const toggle = () => setIsOpenOptions(prevState => !prevState)

  const optionHandler = (option: IOption) => {
    setSelectedOption(option)
    onChange(option)
    toggle()
  }

  return (
    <Container>
      <Button data-cy='selector-btn' type='button' onClick={toggle}>
        <Text $isEmpty={!selectedOption}>{selectedOption?.name || placeholder || 'Select'}</Text>
        <IconContainer>
          <Icon $up={isOpenOptions} src='/icons/icon-arrow-down.svg' alt='Arrow' />
        </IconContainer>
      </Button>
      {isOpenOptions ? (
        <OptionsContainer role='listbox'>
          {options.map(option => (
            <Option
              key={option.value}
              data-cy={`selector-option-${option.value}`}
              role='option'
              onClick={() => optionHandler(option)}
            >
              {option.name}
            </Option>
          ))}
        </OptionsContainer>
      ) : null}
      {errorMsg ? <ErrorMsg data-cy='error-msg-selector'>{errorMsg}</ErrorMsg> : null}
    </Container>
  )
}

const Container = tw.div`
  w-fit
  flex
  flex-col
  gap-2
  relative
`

const Button = tw.button`
  flex
  gap-4
  border
  border-solid
  border-gray-300
  rounded
  px-2
  py-1
  justify-between
  items-center
`

const Text = styled.p<ITextProps>(({ $isEmpty }) => [
  tw`text-sm text-primary-color`,
  $isEmpty && tw`text-gray-400`
])

const IconContainer = tw.figure`
  flex
  items-center
`

const Icon = styled.img<IIconProps>(({ $up }) => [
  tw`flex-none w-3`,
  $up && tw`rotate-180`
])

const OptionsContainer = tw.ul`
  w-full
  flex
  flex-col
  gap-1
  rounded
  px-2
  py-1
  absolute
  top-9
  bg-secondary-color
  shadow
`

const Option = tw.li`
  text-sm
  text-primary-color
  hover:cursor-pointer
  hover:text-teal-700
`

const ErrorMsg = tw.p`
  text-xs
  text-red-400
`
