export const state = () => ({
  chatSrc: '',
  notiSrc: '',
  videoBGSrc: 'MilkyWay'
})

export const getters = {
  getChatSrc: (state) => {
    return state.chatSrc
  },
  getNotiSrc: (state) => {
    return state.notiSrc
  },
  getVideoBGSrc: (state) => {
    return state.videoBGSrc
  }
}

export const mutations = {
  updateChatSrc: (state, src) => {
    state.chatSrc = src
  },
  updateNotiSrc: (state, src) => {
    state.notiSrc = src
  },
  updateBGSrc: (state, src) => {
    state.videoBGSrc = src
  }
}
