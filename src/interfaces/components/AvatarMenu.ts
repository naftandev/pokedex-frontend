export interface IAvatarMenuProps {
  name: string
  avatar: string
  options: MenuOptions[]
}

interface MenuOptions {
  id: number
  label: string
  onClick: () => void
}
