import { useRouter } from 'next/router'
import { StyledComponentsRegistry } from '@libs'
import { IRootLayoutProps } from '@interfaces'
import { GlobalStyles } from '@styles'
import { Header } from '@components'
import { useStore } from '@hooks'
import { useAuthStore } from '@stores'

export default function RootLayout({ children }: IRootLayoutProps) {
  const { route, push } = useRouter()
  const trainer = useStore({ store: useAuthStore, callback: state => state.trainer })
  const logout = useAuthStore(state => state.logout)
  const headerIsVisible = trainer && !['/', '/signup', '/login'].includes(route)

  const logoutHandler = () => {
    push('/login')
    logout()
  }

  return (
    <StyledComponentsRegistry>
      {headerIsVisible ? (
        <Header
          trainer={trainer}
          options={[
            { id: 1, label: 'Profile', onClick: () => push(`/profile/${trainer._id}`) },
            { id: 2, label: 'Logout', onClick: logoutHandler },
          ]}
        />
      ) : null}
      {children}
      <GlobalStyles />
    </StyledComponentsRegistry>
  )
}
