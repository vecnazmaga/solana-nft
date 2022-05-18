import { logError } from '@/utils/mappers'
import consola from 'consola'

export const unSanitizeIpfsUrl = (url: string): string => {
  return `ipfs://ipfs/${url}`
}

export const justHash = (ipfsLink?: string): boolean => {
  return /^[a-zA-Z0-9]+$/.test(ipfsLink || '')
}

const cidRegex = /ipfs\/([a-zA-Z0-9]+)/
export const extractCid = (ipfsLink?: string): string => {
  if (!ipfsLink) {
    return ''
  }

  const match = cidRegex.exec(ipfsLink)
  if (!match) {
    const fastCid = fastExtract(ipfsLink)
    return fastCid
  }

  return match[1]
}

export const fastExtract = (ipfsLink?: string): string => {
  if (!ipfsLink) {
    return ''
  }

  return ipfsLink.replace('ipfs://ipfs/', '')
}

const IPFS2AR = 'https://ipfs2arweave.com/permapin/'
export const ipfsToArweave = async (ipfsLink: string): Promise<string> => {
  const hash = justHash(ipfsLink) ? ipfsLink : extractCid(ipfsLink)
  try {
    const res = await fetch(IPFS2AR + hash, { method: 'POST' })
    if (res.ok) {
      return (await res.json()).arweaveId
    }

    return ''
  } catch (e: any) {
    logError(e, (msg) => {
      consola.error(`[IPFS2AR] Unable to Arweave ${msg}`)
    })
    return ''
  }
}
