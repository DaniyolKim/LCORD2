export const state = () => ({
  selIndex: 0,
  leftCount: 0,
  rightCount: 0,
  title: '',
  leftTeamName: '',
  rightTeamName: '',
  matchList: [
    { tier: '', leftPlayer: '', map: '', rightPlayer: '', winner: '' },
    { tier: '', leftPlayer: '', map: '', rightPlayer: '', winner: '' },
    { tier: '', leftPlayer: '', map: '', rightPlayer: '', winner: '' },
    { tier: '', leftPlayer: '', map: '', rightPlayer: '', winner: '' },
    { tier: '', leftPlayer: '', map: '', rightPlayer: '', winner: '' },
    { tier: '', leftPlayer: '', map: '', rightPlayer: '', winner: '' },
    { tier: '', leftPlayer: '', map: '', rightPlayer: '', winner: '' }
  ]
})

export const getters = {
  getMatchInfo: (state) => {
    return state
  }
}

export const mutations = {
  update: (state, data) => {
    const keys = [
      'selIndex', 'leftCount', 'rightCount', 'title', 'leftTeamName', 'rightTeamName', 'matchList'
    ]
    keys.forEach((key) => {
      state[key] = data[key]
    })
  }
}
