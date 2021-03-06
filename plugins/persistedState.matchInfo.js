// plugins/persistedState.js
import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    key: 'matchInfo',
    paths: ['matchInfo']
  })(store)
}
