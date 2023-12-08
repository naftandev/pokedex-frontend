import { useState } from 'react'
import tw from 'twin.macro'
import { IAvatarMenuProps } from '@interfaces'

export default function AvatarMenu({ name, avatar, options }: IAvatarMenuProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const toggleMenu = () => setIsOpenMenu(prevState => !prevState)

  const menuOptionHandler = (onClick: () => void) => {
    onClick()
    if (isOpenMenu) toggleMenu()
  }

  return (
    <Container>
      <AvatarContainer data-cy='avatar' role='button' onClick={toggleMenu}>
        <Avatar src={avatar} alt={name} />
      </AvatarContainer>
      {options.length && isOpenMenu ? (
        <Menu role='menu' data-cy='avatar-menu'>
          {options.map(({ id, label, onClick }) => (
            <MenuItem key={id} data-cy={`avatar-menuitem-${id}`} role='menuitem' onClick={() => menuOptionHandler(onClick)}>
              <MenuItemText>{label}</MenuItemText>
            </MenuItem>
          ))}
        </Menu>
      ) : null}
    </Container>
  )
}

const Container = tw.div`
  relative
`

const AvatarContainer = tw.figure`
  flex
`

const Avatar = tw.img`
  w-10
  h-10
  rounded-full
  border-secondary-color
  border-2
  border-solid
  cursor-pointer
`

const Menu = tw.ul`
  flex
  flex-col
  gap-1
  rounded
  p-2.5
  absolute
  top-12
  right-0
  bg-secondary-color
  shadow
`

const MenuItem = tw.li`
  list-none
  cursor-pointer
`

const MenuItemText = tw.p`
  font-medium
  text-sm
  text-primary-color
  hover:text-teal-700
`
