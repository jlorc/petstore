interface PetsModuleActions {
  FETCH_PETS_BY_STATUS: string
}

interface PetsModuleMutations {
  SET_PETS_BY_STATUS: string
  SET_CURRENT_FILTER: string
  SET_LOADING: string
}

interface PetsModuleGetters {
  GET_PETS_BY_STATUS: string
  GET_CURRENT_FILTER: string
  GET_LOADING: string
}

export const PETS_MODULE_ACTIONS: PetsModuleActions = {
  FETCH_PETS_BY_STATUS: 'FETCH_PETS_BY_STATUS',
}

export const PETS_MODULE_MUTATIONS: PetsModuleMutations = {
  SET_PETS_BY_STATUS: 'SET_PETS_BY_STATUS',
  SET_CURRENT_FILTER: 'SET_CURRENT_FILTER',
  SET_LOADING: 'SET_LOADING',
}

export const PETS_MODULE_GETTERS: PetsModuleGetters = {
  GET_PETS_BY_STATUS: 'GET_PETS_BY_STATUS',
  GET_CURRENT_FILTER: 'GET_CURRENT_FILTER',
  GET_LOADING: 'GET_LOADING',
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
