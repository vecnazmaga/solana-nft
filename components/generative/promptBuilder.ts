import { $fetch } from 'ohmyfetch'
import { PredictionStatus } from '@/services/replicate'
import { pinImageSafe } from '@/utils/safePin'
import {
  Attribute,
  createMetadata,
  unSanitizeIpfsUrl,
} from '@kodadot1/minimark'
import { pinJson } from '@/services/nftStorage'

export type Options = {
  gender: string
  vibe: string
  framing: string
  filmType: string
  style: string
  inspiredBy: string
  having: string
  wearing: string
  art: string
  lighting: string
}

const OF = 'of'
const BY = 'by'
const COMMA = ','

export const NAME = 'Valentine anime'

export const buildPrompt = (options: Options): string => {
  const { gender, framing, art, style, having, wearing, lighting, inspiredBy } =
    options
  const prompt = [
    framing,
    style || '',
    art,
    OF,
    gender,
    having ? `having ${having}${COMMA}` : '',
    wearing ? `wearing ${wearing}${COMMA}` : '',
    lighting ? `${lighting} lighting${COMMA}` : '',
    inspiredBy ? `${BY} ${inspiredBy}` : '',
  ]
    .filter((x) => x !== '')
    .join(' ')
    .replace(/,\s*$/, '')
  return prompt
  // const { gender, framing, art, style } = options
  // return `${framing} ${style || ''} ${art} of ${gender} ${having} ${wearing}`
}

// I am an anime waifu from Sub0 generated using Stable Diffusion.
// And I would like to say something about this picture:
// The picture that you see is a portrait oil painting of me.
// As you can see, I have these cute cat ears and wearing comfy kimono.
// Why does this picture look so kawaii? I think it is because of the soft lighting.
// And the vibe? Art was insipired by artist Yaoki

export const buildDescription = (options: Options): string => {
  const { gender, framing, art, style, having, wearing, lighting, inspiredBy } =
    options
  let base = `Konnichiwa! I am your Valentine anime ${gender} generated by artificial intelligence and I have already fallen in love with you.\n
    I will be the best Valentine, whether for you or someone special to you.\n
    Let me tell you a secret about this picture:\n\n
    This lovely picture that you see is a ${framing} ${style} ${art} of me.\n
  `

  if (having) {
    base += `As you can see, I have ${having}.\n`
  }

  if (wearing) {
    base += `I am wearing ${wearing}.\n`
  }

  if (lighting) {
    base += `Why does this picture look soo interesting? It's because the ${lighting} lighting gives it its unique vibe.\n`
  }

  if (inspiredBy) {
    base += `To make it even more beautiful, art was inspired by ${inspiredBy}.\n`
  }

  return base
}

export const buildAttributes = (options: Options): Attribute[] => {
  return Object.entries(options).map(([key, value]) => ({
    trait_type: key,
    value,
  }))
}

export const buildMetadata = async (
  url: string,
  options: Options,
  { input, version, logs }: PredictionStatus
): Promise<string> => {
  const blob: Blob = await $fetch(url, { responseType: 'blob' })
  const file = new File([blob], 'image.png', { type: 'image/png' })
  const imageHash = await pinImageSafe(file, 'token')
  const attributes = buildAttributes(options)
  const description = buildDescription(options)
  const name = `${NAME} ${options.gender}`

  const meta = createMetadata(
    name,
    description,
    imageHash,
    undefined,
    attributes,
    undefined,
    'image/png'
  )

  const replicableMeta = {
    ...meta,
    replicate: {
      input: {
        ...input,
        seed: logs.match(/Using seed: (\d+)/)?.at(1),
      },
      version,
    },
  }

  const metaHash = await pinJson(replicableMeta, imageHash)

  return unSanitizeIpfsUrl(metaHash)
}
