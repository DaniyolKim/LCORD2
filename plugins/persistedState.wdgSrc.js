// plugins/persistedState.js
import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    key: 'widgetSrc',
    paths: ['widgetSrc']
  })(store)
}
