// Copyright 2017-2021 @polkadot/app-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Prefix } from '@kodadot1/static'
import type { ApiPromise } from '@polkadot/api'
import { SubmittableExtrinsicFunction } from '@polkadot/api/types'
import { XcmVersionedMultiLocation } from '@polkadot/types/lookup'
import { AnyTuple } from '@polkadot/types/types'
import { isFunction } from '@polkadot/util'
import * as paraspell from '@paraspell/sdk'
import { ApiFactory } from '@kodadot1/sub-api'
import { getChainEndpointByPrefix } from '@/utils/chain'


type Extrisic = SubmittableExtrinsicFunction<'promise', AnyTuple>

// import { KUSAMA_GENESIS } from '@polkadot/apps-config';

const KUSAMA_GENESIS = ''
// 4 * BaseXcmWeight on Kusama
const KUSAMA_WEIGHT = 4 * 1_000_000_000

const DEFAULT_WEIGHT = KUSAMA_WEIGHT

const KNOWN_WEIGHTS: Record<string, number> = {
  [KUSAMA_GENESIS]: KUSAMA_WEIGHT,
}

export enum Chain {
  KUSAMA = 'Kusama',
  BASILISK = 'Basilisk',
  STATEMINE = 'Statemine',
  STATEMINT = 'Statemint',
  POLKADOT = 'Polkadot',
}

type TeleportChain = {
  prefix: Prefix
  chain: Chain
  name: string
}

export type TeleportTransition = {
  source: TeleportChain | null,
  destination: TeleportChain,
  amount: number,
  amountFormatted: string,
  amountUsd: string,
  token: string
}

export const allowedTransitions = {
  [Chain.KUSAMA]: [Chain.BASILISK, Chain.STATEMINE],
  [Chain.BASILISK]: [Chain.KUSAMA],
  [Chain.STATEMINE]: [Chain.KUSAMA],
  [Chain.POLKADOT]: [Chain.STATEMINT],
  [Chain.STATEMINT]: [Chain.POLKADOT],
}

export const chainToPrefixMap: Record<Chain, Prefix> = {
  [Chain.KUSAMA]: 'rmrk',
  [Chain.BASILISK]: 'bsx',
  [Chain.STATEMINE]: 'ahk',
  [Chain.STATEMINT]: 'ahp',
  [Chain.POLKADOT]: 'dot',
}

export const prefixToChainMap: Partial<Record<Prefix, Chain>> = {
  'rmrk': Chain.KUSAMA,
  'bsx': Chain.BASILISK,
  'ahk': Chain.STATEMINE,
  'ahp': Chain.STATEMINT,
  'dot': Chain.POLKADOT
}

export enum TeleprtType {
  RelayToPara = 'RelayToPara',
  ParaToRelay = 'ParaToRelay',
  ParaToPara = 'ParaToPara',
}

export const whichTeleportType = ({
  from,
  to,
}: {
  from: Chain
  to: Chain
}): TeleprtType => {
  switch (from) {
    case Chain.KUSAMA:
    case Chain.POLKADOT:
      return TeleprtType.RelayToPara

    case Chain.BASILISK:
    case Chain.STATEMINE:
    case Chain.STATEMINT:
      return [Chain.KUSAMA, Chain.POLKADOT].includes(to)
        ? TeleprtType.ParaToRelay
        : TeleprtType.ParaToPara

    default:
      throw new Error(`Unknown chain: ${from}`)
  }
}

export function getTeleportWeight(api: ApiPromise): number {
  return KNOWN_WEIGHTS[api.genesisHash.toHex()] || DEFAULT_WEIGHT
}

export function findCall(api: ApiPromise): Extrisic {
  const m = XCM_LOC.filter(
    (x) => api.tx[x] && XCM_FNS.some((f) => isFunction(api.tx[x][f])),
  )[0]
  const f = XCM_FNS.filter((f) => isFunction(api.tx[m][f]))[0]

  return api.tx[m][f]
}

export const XCM_LOC = ['xcm', 'xcmPallet', 'polkadotXcm']
export const XCM_FNS = ['limitedTeleportAssets', 'teleportAssets']

export function getApiParams(
  api: ApiPromise,
  call: Extrisic,
  isParaTeleport: string | undefined,
  account: string,
  amount: string,
): any[] {
  const firstType = api.createType<XcmVersionedMultiLocation>(
    call.meta.args[0].type.toString(),
  )
  const isCurrent = firstType.defKeys.includes('V1')

  const dst = isParaTeleport ? { X1: 'Parent' } : { X1: { ParaChain: 1000 } }

  const acc = {
    X1: {
      AccountId32: {
        id: api.createType('AccountId32', account).toHex(),
        network: 'Any',
      },
    },
  }
  const ass = isParaTeleport
    ? [{ ConcreteFungible: { amount, id: { X1: 'Parent' } } }]
    : // forgo id - 'Here' for 9100, 'Null' for 9110 (both is the default enum value)
      [{ ConcreteFungible: { amount } }]

  const destWeight = getTeleportWeight(api)

  return isCurrent
    ? call.meta.args.length === 5
      ? // with weight
        call.method === 'limitedTeleportAssets'
        ? [{ V0: dst }, { V0: acc }, { V0: ass }, 0, { Unlimited: null }]
        : [{ V0: dst }, { V0: acc }, { V0: ass }, 0, destWeight]
      : // without weight
        [{ V0: dst }, { V0: acc }, { V0: ass }, 0]
    : [dst, acc, ass, destWeight]
}


const getApi = (chain: Chain) => {
  const endpoint = getChainEndpointByPrefix(chainToPrefixMap[chain]) as string
  return ApiFactory.useApiInstance(endpoint)
}

export const getTransaction = async ({
  amount, from, to, address, currency
}: { amount: number, from: Chain, to: Chain, address: string, currency: string }) => {

  const api = await getApi(from)

  const telportType = whichTeleportType({
    from: from,
    to: to,
  })

  if (telportType === TeleprtType.RelayToPara) {
    return paraspell
      .Builder(api)
      .to(Chain[to.toUpperCase()])
      .amount(amount)
      .address(address)
      .build()
  }

  if (telportType === TeleprtType.ParaToRelay) {
    return paraspell
      .Builder(api)
      .from(Chain[from.toUpperCase()])
      .amount(amount)
      .address(address)
      .build()
  }

  if (telportType === TeleprtType.ParaToPara) {
    return paraspell
      .Builder(api)
      .from(Chain[from.toUpperCase()])
      .to(Chain[to.toUpperCase()])
      .currency(currency)
      .amount(amount)
      .address(address)
      .build()
  }
}

export const getChainCurrency = (chain: Chain) => {
  switch (chain) {
    case Chain.KUSAMA:
    case Chain.BASILISK:
    case Chain.STATEMINE:
      return 'KSM'
    case Chain.POLKADOT:
    case Chain.STATEMINT:
      return 'DOT'
  }
}

export enum TransactionStepStatus {
  FAILED = 'failed',
  COMPLETED = 'completed', 
  WAITING = 'waiting',
  LOADING = 'loading'
}
