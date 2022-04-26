export const state = () => ({
  chatSrc: '',
  notiSrc: ''
})

export const getters = {
  getChatSrc: (state) => {
    return state.chatSrc
  },
  getNotiSrc: (state) => {
    return state.notiSrc
  }
}

export const mutations = {
  updateChatSrc: (state, src) => {
    state.chatSrc = src
  },
  updateNotiSrc: (state, src) => {
    state.notiSrc = src
  }
}
