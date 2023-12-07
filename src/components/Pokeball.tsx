import tw, { styled } from 'twin.macro'
import { IIconContainerProps, IPokeballProps, ITitleProps } from '@interfaces'

export default function Pokeball({ direction, theme }: IPokeballProps) {
  return (
    <IconContainer $direction={direction}>
      <Icon src='/icons/icon-pokeball.svg' alt='Pokeball' />
      <Title $theme={theme}>POKEDEX</Title>
    </IconContainer>
  )
}

const IconContainer = styled.figure<IIconContainerProps>(({ $direction }) => [
  tw`flex items-center gap-2`,
  $direction === 'row' ? tw`flex-row justify-center` : tw`flex-col items-center`
])

const Icon = tw.img`
  w-10
  h-10
`

const Title = styled.h1<ITitleProps>(({ $theme }) => [
  tw`font-extrabold text-3xl leading-normal`,
  $theme === 'dark' ? tw`text-primary-color` : tw`text-secondary-color`
])
