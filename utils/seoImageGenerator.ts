import { URLS } from './constants'

export const generateNftImage = (
  name: string,
  price: string,
  image: string,
  mimeType = ''
): string => {
  return `${URLS.koda.seoCard}${encodeURIComponent(
    name
  )}.jpeg?price=${price}&image=${image}&mime=${mimeType}`
}
