import { shallowMount, createLocalVue } from '@vue/test-utils'
import Filters from '@/components/Filters.vue'
import * as Vuex from 'vuex'
import PetsModule from '~/store/modules/PetsModule'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Filters', () => {
  let wrapper

  beforeEach(() => {
    const store = new Vuex.Store({
      state: {},
      modules: {
        'modules/PetsModule': {
          ...PetsModule,
        },
      },
    })

    wrapper = shallowMount(Filters, {
      localVue,
      store,
    })
  })

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
