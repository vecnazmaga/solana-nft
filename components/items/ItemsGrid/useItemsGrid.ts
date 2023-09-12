import resolveQueryPath from '@/utils/queryPathResolver'
import { getDenyList } from '@/utils/prefix'
import isEqual from 'lodash/isEqual'
import { useSearchParams } from './utils/useSearchParams'
import { Ref } from 'vue'

import type { NFTWithMetadata } from '@/composables/useNft'

export function useFetchSearch({
  first,
  total,
  isFetchingData,
  resetSearch,
  isLoading,
}: {
  first: Ref<number>
  total: Ref<number>
  isFetchingData: Ref<boolean>
  isLoading: Ref<boolean>
  resetSearch: () => void
}) {
  const { $apollo } = useNuxtApp()
  const { client, urlPrefix } = usePrefix()
  const route = useRoute()

  const nfts = ref<NFTWithMetadata[]>([])
  const loadedPages = ref([] as number[])

  const { searchParams } = useSearchParams()

  interface FetchSearchParams {
    page?: number
    loadDirection?: 'up' | 'down'
    search?: { [key: string]: string | number }[]
  }

  async function fetchSearch({
    page = 1,
    loadDirection = 'down',
    search,
  }: FetchSearchParams) {
    if (isFetchingData.value) {
      return false
    }
    isFetchingData.value = true

    const getQueryPath = (prefix: string) => {
      switch (prefix) {
        case 'rmrk':
          return 'chain-rmrk'
        case 'ksm':
          return 'chain-ksm'
        case 'ahk':
          return 'chain-ahk'
        default:
          return prefix
      }
    }

    const variables = search?.length
      ? { search }
      : {
          search: searchParams.value,
          priceMin: Number(route.query.min),
          priceMax: Number(route.query.max),
        }

    const queryPath = getQueryPath(client.value)
    const query = await resolveQueryPath(queryPath, 'nftListWithSearch')
    const result = await $apollo.query({
      query: query.default,
      client: client.value,
      variables: {
        ...variables,
        first: first.value,
        offset: (page - 1) * first.value,
        denyList: getDenyList(urlPrefix.value),
        orderBy: route.query.sort?.length
          ? route.query.sort
          : ['blockNumber_DESC'],
      },
    })
    const extractBaseName = (input: string): string => {
      const regex = / #\d+$/
      return input.replace(regex, '')
    }

    const handleToken = (token: any) => {
      if (token.count === 1) {
        return token.nfts[0]
      }

      return {
        ...token.nfts[0],
        name: extractBaseName(token.nfts[0].name),
        count: token.count,
        floorPrice: Math.min(
          ...token.nfts.map((nft: any) => Number(nft.price))
        ).toString(),
      }
    }

    // handle results
    const { isAssetHub } = useIsChain(urlPrefix)
    const nftEntities = isAssetHub.value
      ? result.data.tokenEntities.map(handleToken)
      : result.data.nFTEntities
    const nftEntitiesConnection = isAssetHub.value
      ? result.data.tokenEntitiesConnection
      : result.data.nftEntitiesConnection

    total.value = nftEntitiesConnection.totalCount

    if (!loadedPages.value.includes(page)) {
      if (loadDirection === 'up') {
        nfts.value = nftEntities.concat(nfts.value)
      } else {
        nfts.value = nfts.value.concat(nftEntities)
      }
      loadedPages.value.push(page)
    }

    isFetchingData.value = false
    isLoading.value = false
    return true
  }

  function clearFetchResults() {
    nfts.value = []
    loadedPages.value = []
  }

  const refetch = (search?: { [key: string]: string | number }[]) => {
    clearFetchResults()
    fetchSearch({ search })
  }

  watch(
    [
      () => route.query.sort,
      () => route.query.search,
      () => route.query.listed,
      () => route.query.min,
      () => route.query.max,
      () => route.query.owned,
      () => route.query.collections,
    ],
    (currentQuery, prevQuery) => {
      if (isEqual(currentQuery, prevQuery)) {
        return
      }
      loadedPages.value = []
      resetSearch()
    }
  )

  return {
    nfts,
    fetchSearch,
    refetch,
    clearFetchResults,
  }
}
