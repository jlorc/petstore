import Vuex from 'vuex'
import PetsModule from '~/store/modules/PetsModule'

export function createStore() {
  return new Vuex.Store({
    modules: {
      PetsModule,
    },
  })
}
