interface PetsModuleActions {
  FETCH_PETS_BY_STATUS: string
  POST_PLACE_AN_ORDER: string
}

interface PetsModuleMutations {
  SET_PETS_BY_STATUS: string
  SET_CURRENT_FILTER: string
  SET_LOADING: string
  SET_POST_ERROR: string
}

interface PetsModuleGetters {
  GET_PETS_BY_STATUS: string
  GET_CURRENT_FILTER: string
  GET_LOADING: string
  GET_POST_ERROR: string
}

export const PETS_MODULE_ACTIONS: PetsModuleActions = {
  FETCH_PETS_BY_STATUS: 'FETCH_PETS_BY_STATUS',
  POST_PLACE_AN_ORDER: 'POST_PLACE_AN_ORDER',
}

export const PETS_MODULE_MUTATIONS: PetsModuleMutations = {
  SET_PETS_BY_STATUS: 'SET_PETS_BY_STATUS',
  SET_CURRENT_FILTER: 'SET_CURRENT_FILTER',
  SET_LOADING: 'SET_LOADING',
  SET_POST_ERROR: 'SET_POST_ERROR',
}

export const PETS_MODULE_GETTERS: PetsModuleGetters = {
  GET_PETS_BY_STATUS: 'GET_PETS_BY_STATUS',
  GET_CURRENT_FILTER: 'GET_CURRENT_FILTER',
  GET_LOADING: 'GET_LOADING',
  GET_POST_ERROR: 'GET_POST_ERROR',
}

interface IdAndName {
  id: number
  name: string
}

export interface Pet {
  category: IdAndName
  id: number
  name: string
  photoUrls: Array<string>
  status: string
  tags: IdAndName
}
