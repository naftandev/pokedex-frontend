import tw from 'twin.macro'
import { IButtonProps } from '@interfaces'
import { Spinner } from '@components'

export default function Button({ type, text, isLoading, onClick }: IButtonProps) {
  return (
    <ButtonComponent type={type} disabled={isLoading} onClick={onClick}>
      {!isLoading ? text : <Spinner />}
    </ButtonComponent>
  )
}

const ButtonComponent = tw.button`
  rounded
  p-2
  text-sm
  text-secondary-color
  bg-teal-700
  cursor-pointer
`
