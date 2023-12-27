import { useFiatStore } from '@/stores/fiat'
import { useIdentityStore } from '@/stores/identity'

export type Token = 'BSX' | 'KSM'

export const ksmToBsx = (value: number): number => {
  const fiatStore = useFiatStore()
  const KSMToUsd = fiatStore.getCurrentKSMValue
  const BSXToUsd = fiatStore.getCurrentBSXValue
  return value * (Number(KSMToUsd) / Number(BSXToUsd))
}

export const getBalance = (token?: Token): number => {
  const { balance } = useAuth()
  const { tokenId } = usePrefix()
  const identityStore = useIdentityStore()

  if (token === 'KSM') {
    return Number(identityStore.getTokenBalanceOf(tokenId.value))
  }
  return Number(balance.value)
}

export const getDeposit = (token: Token, depositInKSM: number): number => {
  return token === 'KSM' ? depositInKSM : ksmToBsx(depositInKSM)
}
