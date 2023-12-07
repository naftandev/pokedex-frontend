import tw from 'twin.macro'
import Swal from 'sweetalert2'
import { IPokemonInfo } from '@interfaces'

export default function PokemonCard({ picture, order, height, name, moves, stats, abilities }: IPokemonInfo) {
  const selectHandler = () => {
    const description = `
      <div style='display: flex; flex-direction: column; gap: 10px; border-radius: 5px; padding: 25px; background-color: #E9F7EF;'>
        ${stats.map(({ name, value }) => (`
          <div style='display: flex; gap: 5px; justify-content: flex-start;'>
            <strong style="flex: none; font-family: 'Ubuntu'; font-size: 17px; font-weight: 500; text-align: left;">
              ${name}:
            </strong>
            <span style="font-family: 'Ubuntu'; font-size: 17px; font-weight: 400; text-align: left;">
              ${value}
            </span>
          </div>
        `))}
        <div style='display: flex; gap: 5px; justify-content: flex-start;'>
          <strong style="flex: none; font-family: 'Ubuntu'; font-size: 17px; font-weight: 500; text-align: left;">
            Abilities:
          </strong>
          <p style="font-family: 'Ubuntu'; font-size: 17px; font-weight: 400; text-transform: capitalize; text-align: left;">
            ${abilities.join(', ')}
          </p>
        </div>
      </div>
    `

    Swal.fire({
      title: name.toUpperCase(),
      html: description,
      imageUrl: picture,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: name
    })
  }

  return (
    <Container onClick={selectHandler}>
      <PictureContainer>
        <PictureWrapper>
          <Picture src={picture} alt={name} />
        </PictureWrapper>
        <InfoContainer>
          <Order>#{order}</Order>
          <Height>{height} m</Height>
        </InfoContainer>
      </PictureContainer>
      <DescriptionContainer>
        <Name>{name}</Name>
        <Moves>{moves.slice(0, 2).join(', ')}</Moves>
      </DescriptionContainer>
    </Container>
  )
}

const Container = tw.div`
  w-52
  h-fit
  flex
  flex-col
  rounded-2xl
  border
  border-solid
  border-gray-100
  shadow-xl
  cursor-pointer
  overflow-hidden
`

const PictureContainer = tw.figure`
  w-full
  h-56
  flex
  relative
`

const PictureWrapper = tw.figure`
  w-full
  h-full
  flex
  justify-center
`

const Picture = tw.img`
  h-full
`

const InfoContainer = tw.div`
  w-full
  flex
  px-3
  justify-between
  items-center
  absolute
  bottom-3
`

const Order = tw.span`
  text-sm
  text-primary-color
`

const Height = tw.span`
  w-16
  rounded-3xl
  px-1
  text-sm
  leading-relaxed
  text-center
  text-secondary-color
  bg-teal-700
`

const DescriptionContainer = tw.div`
  w-full
  p-3
  flex
  flex-col
  justify-between
`

const Name = tw.strong`
  mb-1
  capitalize
  text-primary-color
`

const Moves = tw.p`
  text-sm
  capitalize
  text-primary-color
  opacity-80
`
