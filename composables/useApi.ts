import { DEFAULT_PREFIX } from '@kodadot1/static'
import { ApiFactory } from '@kodadot1/sub-api'
import type { ApiPromise } from '@polkadot/api'
import { getChainEndpointByPrefix } from '@/utils/chain'

export default function () {
  const { urlPrefix } = usePrefix()

  const apiUrl = computed(() => {
    const endpoint: string =
      getChainEndpointByPrefix(urlPrefix.value) ||
      getChainEndpointByPrefix(DEFAULT_PREFIX) ||
      ''
    return endpoint
  })

  const apiInstance = computed<Promise<ApiPromise>>(() =>
    ApiFactory.useApiInstance(apiUrl.value)
  )

  return {
    apiUrl,
    apiInstance,
  }
}
