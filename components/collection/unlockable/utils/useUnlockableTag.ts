import { getDropDetails } from '@/components/drops/useDrops'

export const useUnlockableTag = (responsive: boolean = true) => {
  const { $i18n } = useNuxtApp()
  const { width } = useWindowSize()

  const drop = ref()

  const smallWidth = computed(() => width.value < 502 && responsive)
  const isMintedOut = computed(() => drop.value?.isMintedOut)
  const isFree = computed(() => drop.value?.isFree)

  const mintStatusText = computed(() => {
    if (isMintedOut.value) {
      return $i18n.t('mint.unlockable.mintedOut')
    }

    let mintLive = isFree.value
      ? 'mint.unlockable.freeMintLive'
      : 'mint.unlockable.mintLive'

    if (smallWidth.value) {
      mintLive += 'Small'
    }

    return $i18n.t(mintLive)
  })

  const actionText = computed(() =>
    isMintedOut.value
      ? $i18n.t('mint.unlockable.seeListings')
      : $i18n.t('mint.unlockable.takeMe'),
  )

  const to = computed(() =>
    isMintedOut.value
      ? `/${DEFAULT_DROP.chain}/explore/items?listed=true&collections=${DEFAULT_DROP.id}`
      : `/${DEFAULT_DROP.chain}/drops/${DEFAULT_DROP.alias}`,
  )

  onBeforeMount(async () => {
    drop.value = await getDropDetails({
      alias: DEFAULT_DROP.alias,
      collectionId: DEFAULT_DROP.id,
      chain: DEFAULT_DROP.chain,
    })
  })

  return {
    to,
    actionText,
    mintStatusText,
    smallWidth,
  }
}
