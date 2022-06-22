export type Offer = {
  id: string
  caller: string
  expiration: string
  price: string
  status: string
  nft: {
    id: string
    name: string
  }
}

export type OfferResponse = {
  offers: Offer[]
  stats: {
    total: number
  }
}
export type OfferStats = {
  status: string
  totalCount: number
  totalPrice: bigint
}

export type ActiveWallets = {
  totalCount: number
}
export type StatsResponse = {
  buys: {
    totalCount: number
  }
  offerStats: OfferStats[]
  listed: {
    count: number
  }
  minted: {
    count: number
  }
  createdCollections: {
    totalCount: number
  }
  activeWallets: ActiveWallets[]
}
