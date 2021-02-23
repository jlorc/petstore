import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import {
  PETS_MODULE_ACTIONS,
  PETS_MODULE_MUTATIONS,
  PETS_MODULE_GETTERS,
  Pet,
} from '~/store/constants/PetsModuleConstants'

@Module({
  namespaced: true,
  stateFactory: true,
})
export default class PetsModule extends VuexModule {
  pets: Array<Pet> | [] = []
  currentFilter: string = 'available'
  isLoadingActive: boolean = false
  postError: boolean = false

  @Action({ commit: PETS_MODULE_MUTATIONS.SET_PETS_BY_STATUS, rawError: true })
  async [PETS_MODULE_ACTIONS.FETCH_PETS_BY_STATUS](
    status: string
  ): Promise<Array<Pet>> {
    const response = await fetch(
      `https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`
    )
    return response.json()
  }

  @Action({ commit: PETS_MODULE_MUTATIONS.SET_POST_ERROR, rawError: true })
  async [PETS_MODULE_ACTIONS.POST_PLACE_AN_ORDER](
    petData: Pet
  ): Promise<boolean> {
    const petPostData = {
      id: 0,
      petId: petData.id,
      quantity: 1,
      shipDate: new Date().toISOString(),
      status: 'placed',
      complete: true,
    }
    const response = await fetch('https://petstore.swagger.io/v2/store/order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petPostData),
    })

    return response.status !== 200
  }

  @Mutation
  [PETS_MODULE_MUTATIONS.SET_PETS_BY_STATUS](petsList: Array<Pet>): void {
    this.pets = petsList
  }

  @Mutation
  [PETS_MODULE_MUTATIONS.SET_CURRENT_FILTER](filterStatus: string): void {
    this.currentFilter = filterStatus
  }

  @Mutation
  [PETS_MODULE_MUTATIONS.SET_LOADING](loading: boolean): void {
    this.isLoadingActive = loading
  }

  @Mutation
  [PETS_MODULE_MUTATIONS.SET_POST_ERROR](error: boolean): void {
    this.postError = error
  }

  get [PETS_MODULE_GETTERS.GET_PETS_BY_STATUS](): Array<Pet> | [] {
    return this.pets
  }

  get [PETS_MODULE_GETTERS.GET_CURRENT_FILTER](): string {
    return this.currentFilter
  }

  get [PETS_MODULE_GETTERS.GET_LOADING](): boolean {
    return this.isLoadingActive
  }

  get [PETS_MODULE_GETTERS.GET_POST_ERROR](): boolean {
    return this.postError
  }
}
