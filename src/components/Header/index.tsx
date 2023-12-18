import Link from 'next/link'
import tw from 'twin.macro'
import { IHeaderProps } from '@interfaces'
import Logo from '../Logo'
import AvatarMenu from '../AvatarMenu'

export default function Header({ trainer, options }: IHeaderProps) {
  return (
    <Container>
      <Link href='/dashboard' data-cy='logo-link'>
        <Logo direction='row' theme='light' />
      </Link>
      <ProfileContainer>
        <UserName data-cy='header-trainer-name'>Welcome, {trainer.name}!</UserName>
        <AvatarMenu
          avatar={trainer.avatar}
          name={trainer.name}
          options={options}
        />
      </ProfileContainer>
    </Container>
  )
}

const Container = tw.div`
  flex
  px-5
  py-3
  justify-between
  items-center
  bg-primary-color
`

const ProfileContainer = tw.div`
  flex
  gap-5
  items-center
`

const UserName = tw.strong`
  hidden
  text-base
  text-secondary-color
  md:block
`
