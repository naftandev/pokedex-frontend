import { createGlobalStyle } from 'styled-components'

const CustomStyles = createGlobalStyle`
  :root {
    --primary-color: #333333;
    --secondary-color: #ffffff;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    border: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
`

const GlobalStyles = () => <CustomStyles />

export default GlobalStyles
