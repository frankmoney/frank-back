import React from 'react'
import { Image } from 'react-html-email'

export const LOGO_URL = 'https://assets2.frank.ly/frank/email/frank_logo_91@2x.png'
export const LOGO_WIDTH = 91
export const LOGO_HEIGHT = 29


export default () => {

  return (
    <Image src={LOGO_URL} width={LOGO_WIDTH} height={LOGO_HEIGHT} alt='Frank logo'/>
  )
}
