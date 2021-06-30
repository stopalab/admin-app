import { extendTheme } from "@chakra-ui/react"

const colors = {

}
const fonts = {
  default: 'Manrope; sans-serif'
}

const styles = {
  global: {
    'html, body': {
      margin: 0,
      padding: 0,
      fontFamily: fonts.default,
    }
  }
}

export const theme = extendTheme({ styles, fonts, colors })