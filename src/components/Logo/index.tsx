import tw, { styled } from 'twin.macro'
import { IIconContainerProps, ILogoProps, ITitleProps } from '@interfaces'

export default function Logo({ direction, theme }: ILogoProps) {
  return (
    <IconContainer role='group' $direction={direction}>
      <Icon src='/images/pokeball.png' alt='Pokeball' />
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
  tw`hidden font-extrabold text-3xl leading-normal md:block`,
  $theme === 'dark' ? tw`text-primary-color` : tw`text-secondary-color`
])
