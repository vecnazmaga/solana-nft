import { ActionTree, Commit, GetterTree, MutationTree } from 'vuex'

export const state = (): {
  // Interface
  exploreFilterCollapseOpen: boolean
  layoutClass: string
  advancedUI: boolean
  theatreView: string
  compactGalleryItem: boolean
  compactCollection: boolean
  showPriceGallery: boolean
  showMintTimeCollection: boolean
  galleryItemsPerPage: number
  collectionsPerPage: number
  exploreTabOrder: string
  historyItemsPerPage: number
  replaceBuyNowWithYolo: boolean
  enableAllArtwork: boolean
  enableGyroEffect: boolean
  // Minting
  hasSupport: boolean
  hasCarbonOffset: boolean
  arweaveUpload: boolean
} => ({
  exploreFilterCollapseOpen: true,
  layoutClass: 'is-one-quarter-desktop is-one-third-tablet',
  advancedUI: false,
  theatreView: 'default',
  compactGalleryItem: true,
  compactCollection: false,
  showPriceGallery: false,
  showMintTimeCollection: false,
  galleryItemsPerPage: 12,
  collectionsPerPage: 9,
  exploreTabOrder: 'COLLECTION',
  historyItemsPerPage: 12,
  replaceBuyNowWithYolo: false,
  hasSupport: true,
  hasCarbonOffset: true,
  arweaveUpload: false,
  enableAllArtwork: true,
  enableGyroEffect: false,
})

export type PreferencesState = ReturnType<typeof state>

export const getters: GetterTree<PreferencesState, PreferencesState> = {
  getExploreFilterCollapse: ({ exploreFilterCollapseOpen }) =>
    exploreFilterCollapseOpen,
  getLayoutClass: ({ layoutClass }) => layoutClass,
  getTheatreView: ({ theatreView }) => theatreView,
  getCompactCollection: ({ compactCollection }) => compactCollection,
  getShowPriceValue: ({ showPriceGallery }) => showPriceGallery,
  getShowMintTime: ({ showMintTimeCollection }) => showMintTimeCollection,
  getGalleryItemsPerPage: ({ galleryItemsPerPage }) => galleryItemsPerPage,
  getCollectionsPerPage: ({ collectionsPerPage }) => collectionsPerPage,
  getExploreTabOrder: ({ exploreTabOrder }) => exploreTabOrder,
  getHistoryItemsPerPage: ({ historyItemsPerPage }) => historyItemsPerPage,
  getReplaceBuyNowWithYolo: ({ replaceBuyNowWithYolo }) =>
    replaceBuyNowWithYolo,
  getHasSupport: ({ hasSupport }) => hasSupport,
  getHasCarbonOffset: ({ hasCarbonOffset }) => hasCarbonOffset,
  getArweaveUpload: ({ arweaveUpload }) => arweaveUpload,
  getLoadAllArtwork: ({ enableAllArtwork }) => enableAllArtwork,
  getEnableGyroEffect: ({ enableGyroEffect }) => enableGyroEffect,
}

export const mutations: MutationTree<PreferencesState> = {
  SET_EXPLOREFILTER_COLLAPSE(state: PreferencesState, data) {
    state.exploreFilterCollapseOpen = data
  },
  SET_LAYOUT_CLASS(state: PreferencesState, data) {
    state.layoutClass = data
  },
  SET_ADVANCED_UI(state: PreferencesState, data) {
    // if set to false reset state back to default
    if (!data) {
      state.layoutClass = 'is-one-quarter-desktop is-one-third-tablet'
      state.theatreView = 'theatre'
      state.compactGalleryItem = true
      state.compactCollection = false
      state.showPriceGallery = false
      state.galleryItemsPerPage = 12
      state.collectionsPerPage = 9
      state.exploreTabOrder = 'COLLECTION'
      state.historyItemsPerPage = 12
    }
    state.advancedUI = data
  },
  SET_THEATRE_VIEW(state: PreferencesState, data) {
    state.theatreView = data ? 'theatre' : 'default'
  },
  SET_COMPACT_GALLERY_ITEM(state: PreferencesState, data) {
    state.compactGalleryItem = data
  },
  SET_COMPACT_COLLECTION(state: PreferencesState, data) {
    state.compactCollection = data
  },
  SET_SHOW_PRICE(state: PreferencesState, data) {
    state.showPriceGallery = data
  },
  SET_SHOW_MINT_TIME(state: PreferencesState, data) {
    state.showMintTimeCollection = data
  },
  REPLACE_BUYNOW_WITH_YOLO(state: PreferencesState, data) {
    state.replaceBuyNowWithYolo = data
  },
  SET_GALLERY_ITEMS_PER_PAGE(state: PreferencesState, data) {
    state.galleryItemsPerPage = data
  },
  SET_COLLECTIONS_PER_PAGE(state: PreferencesState, data) {
    state.collectionsPerPage = data
  },
  SET_EXPLORE_TAB_ORDER(state: PreferencesState, data) {
    state.exploreTabOrder = data
  },
  SET_HAS_SUPPORT(state: PreferencesState, data) {
    state.hasSupport = data
  },
  SET_HAS_CARBON_OFFSET(state: PreferencesState, data) {
    state.hasCarbonOffset = data
  },
  SET_ARWEAVE_UPLOAD(state: PreferencesState, data) {
    state.arweaveUpload = data
  },
  SET_ALL_ARTWORK_VISIBLE(state: PreferencesState, data) {
    state.enableAllArtwork = data
  },
  SET_ENABLE_GYRO_EFFECT(state: PreferencesState, data) {
    state.enableGyroEffect = data
  },
}

export const actions: ActionTree<PreferencesState, PreferencesState> = {
  setExploreFilterCollapse({ commit }: { commit: Commit }, data) {
    commit('SET_EXPLOREFILTER_COLLAPSE', data)
  },
  setLayoutClass({ commit }: { commit: Commit }, data) {
    commit('SET_LAYOUT_CLASS', data)
  },
  setAdvancedUI({ commit }: { commit: Commit }, data) {
    commit('SET_ADVANCED_UI', data)
  },
  setTheatreView({ commit }: { commit: Commit }, data) {
    commit('SET_THEATRE_VIEW', data)
  },
  setCompactGalleryItem({ commit }: { commit: Commit }, data) {
    commit('SET_COMPACT_GALLERY_ITEM', data)
  },
  setCompactCollection({ commit }: { commit: Commit }, data) {
    commit('SET_COMPACT_COLLECTION', data)
  },
  setShowPriceValue({ commit }: { commit: Commit }, data) {
    commit('SET_SHOW_PRICE', data)
  },
  setShowMintTime({ commit }: { commit: Commit }, data) {
    commit('SET_SHOW_MINT_TIME', data)
  },
  setGalleryItemsPerPage({ commit }: { commit: Commit }, data) {
    commit('SET_GALLERY_ITEMS_PER_PAGE', data)
  },
  setCollectionsPerPage({ commit }: { commit: Commit }, data) {
    commit('SET_COLLECTIONS_PER_PAGE', data)
  },
  setExploreTabOrder({ commit }: { commit: Commit }, data) {
    commit('SET_EXPLORE_TAB_ORDER', data)
  },
  setReplaceBuyNowWithYolo({ commit }: { commit: Commit }, data) {
    commit('REPLACE_BUYNOW_WITH_YOLO', data)
  },
  setHasSupport({ commit }: { commit: Commit }, data) {
    commit('SET_HAS_SUPPORT', data)
  },
  setHasCarbonOffset({ commit }: { commit: Commit }, data) {
    commit('SET_HAS_CARBON_OFFSET', data)
  },
  setArweaveUpload({ commit }: { commit: Commit }, data) {
    commit('SET_ARWEAVE_UPLOAD', data)
  },
  setAllArtworkVisible({ commit }: { commit: Commit }, data) {
    commit('SET_ALL_ARTWORK_VISIBLE', data)
  },
  setEnableGyroEffect({ commit }: { commit: Commit }, data) {
    commit('SET_ENABLE_GYRO_EFFECT', data)
  },
}
