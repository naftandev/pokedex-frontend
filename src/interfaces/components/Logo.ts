export interface ILogoProps {
  direction: TDirection
  theme: TTheme
}

export interface IIconContainerProps {
  $direction: TDirection
}

export interface ITitleProps {
  $theme: TTheme
}

type TDirection = 'row' | 'column'

type TTheme = 'light' | 'dark'
