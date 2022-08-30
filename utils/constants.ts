export const denyList = [
  'DQcegDuBQG6V99hgRd87UJ8anZxTcumJEVBAnAGomXCJ3dc', // RMRK Minter -> Kanaria
  'Gskn3eRyr3tDiKxhzU1MPG4ha8RFTBG9ft3C6Rrn3kGJMXn', // No One, art thief
  'Go6QNymw2HicMi64uiQSPyiXy68wM7dvujwR8bDJ13exPTM', // 18+ manga porn
  'DinoPQrFS2u4NgEk18v6W5QH1SBmHKYUPJGjZUV4JLPj2rd', // Guardians DINO
]

export const statemineDenyList = [
  'EZwaNLfEwAMYcEdbp7uKYFCjnsn43S85pm6BumT5UwvZQvB', // SubstraTee minter, broken IPFS
  'Eipd9P7j9XC7voYxYgAoyE6wwt8BmpLDNC89RAU2cf6Qtrk', // No metadata
]

export const IPFS_KODADOT_IMAGE_PLACEHOLDER =
  'bafkreifahjdjerrz65puqznmsu2acoktrxjbo3vvp2f2j4eb7h5tc345fi'

export const MIN_CAROUSEL_NFT = 3

export const PER_PAGE = 20

export const SHOW_SCROLL_TOP_BUTTON_HEIGHT = 350

export const DETAIL_TIMEOUT = 3000

export const URLS = {
  koda: {
    cloudflare: 'https://durable-jpeg.kodadot.workers.dev/',
    pinata: 'https://kodadot.mypinata.cloud/ipfs/',
    directUpload: 'https://direct-upload.kodadot.workers.dev/',
    estuary: 'https://pinning.kodadot.workers.dev/',
    nftStorage: 'https://nft-storage.kodadot.workers.dev/',
    netlify: 'https://beta.kodadot.xyz/.netlify/functions/',
    seoCard: 'https://og-image-green-seven.vercel.app/',
    magick: 'https://api.subquery.network/sq/vikiival/magick',
    subsquidv5: 'https://app.gc.subsquid.io/beta/rubick/006/graphql',
    subsquidv6: 'https://app.gc.subsquid.io/beta/rubick/007/graphql',
    snekk: 'https://app.gc.subsquid.io/beta/snekk/003/graphql',
    snekkv2: 'https://app.gc.subsquid.io/beta/snekk/004/graphql',
    click: 'https://app.gc.subsquid.io/beta/click/001-rc0/graphql',
  },
  providers: {
    coingecko: 'https://api.coingecko.com/api/v3',
    ramp: 'https://ramp.network/buy/',
    cloudflare: 'https://cloudflare-ipfs.com/ipfs/',
    pinata: 'https://api.pinata.cloud/',
  },
}

export const NFT_SQUID_SORT_CONDITION_LIST: string[] = [
  'blockNumber_DESC',
  'blockNumber_ASC',
  'updatedAt_DESC',
  'updatedAt_ASC',
  'price_DESC',
  'price_ASC',
  'sn_ASC',
]

export const chainTestList = ['westend', 'westmint']
