import { DEFAULT_PREFIX } from '@kodadot1/static'
import { getKusamaAssetId } from '@/utils/api/bsx/query'
import { useAssetsStore } from '@/stores/assets'
import { availablePrefixes } from '@/utils/chain'

import type { Prefix } from '@kodadot1/static'

export default function () {
  const { $store } = useNuxtApp()
  const route = useRoute()
  const storage = useLocalStorage('urlPrefix', { selected: DEFAULT_PREFIX })
  const availablePrefixesList = availablePrefixes()
  const initialPrefixFromPath = availablePrefixesList.find(
    (prefixValue) => prefixValue.value === route.path.split('/')[1]
  )?.value
  const prefix = ref(
    route.params.prefix ||
      initialPrefixFromPath ||
      storage.value.selected ||
      $store.getters.currentUrlPrefix
  )
  const urlPrefix = computed<Prefix>(() => {
    storage.value = { selected: prefix.value }
    return prefix.value
  })

  const setUrlPrefix = (prefix) => {
    storage.value = { selected: prefix }
  }

  const client = computed<string>(() => {
    return urlPrefix.value
  })

  const tokenId = computed(() => getKusamaAssetId(urlPrefix.value))

  const assets = (id: string | number) => {
    if (prefix.value === 'snek' || prefix.value === 'bsx') {
      useAssetsStore().fetchAssetList()
    }
    return useAssetsStore().getAssetById(String(id))
  }

  const isBasilisk = computed(
    () => prefix.value === 'bsx' || prefix.value === 'snek'
  )

  return {
    urlPrefix,
    setUrlPrefix,
    client,
    tokenId,
    assets,
    isBasilisk,
  }
}
