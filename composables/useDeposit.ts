import type { ComputedRef } from 'vue/types'
import type { PalletBalancesAccountData } from '@polkadot/types/lookup'

import { decodeAddress, encodeAddress } from '@polkadot/util-crypto'
import { CHAINS, type Prefix } from '@kodadot1/static'
import { balanceOf } from '@kodadot1/sub-api'
import {
  getAssetMetadataByAccount,
  getKusamaAssetId,
} from '@/utils/api/bsx/query'
import format from '@/utils/format/balance'

type Props = {
  prefix: ComputedRef<Prefix>
}

export default function ({ prefix }: Props) {
  const { apiInstanceByPrefix } = useApi()
  const { accountId } = useAuth()

  const balance = ref()

  const collectionDeposit = ref(0)
  const itemDeposit = ref(0)
  const metadataDeposit = ref(0)

  const chainSymbol = ref('')

  const isKusama = computed(
    () => prefix.value === 'ksm' || prefix.value === 'rmrk'
  )
  const isBasilisk = computed(
    () => prefix.value === 'bsx' || prefix.value === 'snek'
  )
  const isAssetHub = computed(
    () => prefix.value === 'ahk' || prefix.value === 'ahp'
  )

  watchEffect(async () => {
    if (prefix.value) {
      const api = await apiInstanceByPrefix(prefix.value)

      // set deposit amount
      if (isAssetHub.value) {
        collectionDeposit.value = api.consts.nfts.collectionDeposit.toNumber()
        itemDeposit.value = api.consts.nfts.itemDeposit.toNumber()
        metadataDeposit.value = api.consts.nfts.metadataDepositBase.toNumber()
      }

      if (isBasilisk.value) {
        collectionDeposit.value =
          api.consts.uniques.collectionDeposit.toNumber()
        itemDeposit.value = api.consts.uniques.collectionDeposit.toNumber()
        metadataDeposit.value =
          api.consts.uniques.metadataDepositBase.toNumber()
      }

      // get chain symbol
      const chainInfo = await api.registry.getChainProperties()
      chainSymbol.value = chainInfo?.tokenSymbol.toHuman()?.[0]

      if (isBasilisk.value && accountId.value) {
        const assetMetadata = await getAssetMetadataByAccount(
          api,
          accountId.value
        )

        chainSymbol.value = assetMetadata.symbol
      }

      // set balance
      if (accountId.value) {
        const chain = CHAINS[prefix.value]
        const publicKey = decodeAddress(accountId.value)
        const prefixAddress = encodeAddress(publicKey, chain.ss58Format)

        balance.value = await balanceOf(api, prefixAddress)

        if (isBasilisk.value && chainSymbol.value === 'KSM') {
          balance.value = (
            (await api.query.tokens.accounts(
              prefixAddress,
              getKusamaAssetId(prefix.value)
            )) as PalletBalancesAccountData
          ).free.toString()
        }

        balance.value = format(balance.value, chain.tokenDecimals, false)
      }
    }
  })

  return {
    isKusama,
    isBasilisk,
    isAssetHub,
    balance,
    collectionDeposit,
    itemDeposit,
    metadataDeposit,
    chainSymbol,
  }
}
