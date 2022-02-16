import { emptyObject } from '@/utils/empty'
import { Registration } from '@polkadot/types/interfaces/identity/types'
import Connector from '@kodadot1/sub-api'
import Vue from 'vue'
import onApiConnect from '~/utils/api/general'
import Query from '@/utils/api/Query'

declare type Unsubscribe = () => void

export interface IdentityMap {
  [address: string]: Registration
}

export interface Auth {
  address: string
  source: 'keyring' | 'extension' | 'ledger'
  balance: string
}

export interface IdentityStruct {
  identities: IdentityMap
  auth: Auth
  balanceSubscribe: Unsubscribe
}

export interface IdenityRequest {
  address: string
  identity: Registration
}

const defaultState: IdentityStruct = {
  identities: {},
  auth: emptyObject<Auth>(),
  balanceSubscribe: () => void 0,
}

// Disabling namespace to match with the original repo
export const namespaced = false

export const state = () => defaultState

export const mutations = {
  addIdentity(state: IdentityStruct, identityRequest: IdenityRequest): void {
    const { address, identity } = identityRequest
    if (!state.identities[address]) {
      Vue.set(state.identities, address, identity)
    }
  },
  addAuth(state: IdentityStruct, authRequest: Auth): void {
    state.auth = { ...authRequest }
  },
  addBalance(state: IdentityStruct, balance: string): void {
    Vue.set(state.auth, 'balance', balance)
  },
}

export const actions = {
  setIdentity({ commit }: any, identityRequest: IdenityRequest): void {
    commit('addIdentity', identityRequest)
  },
  async fetchIdentity({ dispatch }: any, address: string) {
    const { api } = Connector.getInstance()
    try {
      const optionIdentity = await api?.isReady.then((a) =>
        a?.query.identity?.identityOf(address)
      )
      const identity = optionIdentity?.unwrapOr(null)
      if (identity) {
        dispatch('setIdentity', { address, identity })
      }
    } catch (e) {
      console.error('[FETCH IDENTITY] Unable to get identity', e)
    }
  },
  async fetchBalance({ dispatch }, address: string) {
    onApiConnect(async (api) => {
      try {
        const balance = await Query.getTokenBalance(api, address)
        dispatch('setBalance', balance)
      } catch (e) {
        console.error('[ERR: BALANCE]', e)
      }
    })
  },
  async subscribeBalance({ dispatch }, address: string) {
    onApiConnect(async (api) => {
      try {
        const balanceSub = await api.derive.balances.all(
          address,
          ({ availableBalance }) => {
            dispatch('setBalance', availableBalance.toString())
          }
        )
        dispatch('setSubscription', { key: 'balanceSub', sub: balanceSub })
      } catch (e) {
        console.error('[ERR: BALANCE]', e)
      }
    })
  },
  setAuth({ commit, dispatch }: any, authRequest: Auth): void {
    commit('addAuth', authRequest)
    dispatch('fetchBalance', authRequest.address)
    dispatch('subscribeBalance', authRequest.address)
  },
  setBalance({ commit }, balance: string): void {
    commit('addBalance', balance)
  },
}

export const getters = {
  availableIdentities(state: IdentityStruct): IdentityMap {
    return state.identities
  },
  getIdentityFor(
    state: IdentityStruct
  ): (address: string) => Registration | undefined {
    return (address: string) => state.identities[address]
  },
  getAuth(state: IdentityStruct): Auth {
    return state.auth
  },
  getAuthAddress(state: IdentityStruct): string {
    return state.auth.address
  },
  getAuthBalance(state: IdentityStruct): string {
    return state.auth.balance
  },
}
