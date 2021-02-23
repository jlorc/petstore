<template>
  <div class="filters">
    <div v-click-outside="hideDropdown" class="filters__wrapper">
      <button class="filters__btn" @click="dropdownActive = !dropdownActive">
        {{ currentFilter }}
        <span class="filters__icon" :class="{ active: dropdownActive }"></span>
      </button>
      <div class="filters__dropdown" :class="{ active: dropdownActive }">
        <div
          v-for="filter in filtersOptions"
          class="filters__dropdown-item"
          @click="setFilter(filter)"
        >
          {{ filter }}
          <span
            v-if="filter === currentFilter"
            class="filters__dropdown-icon"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import vClickOutside from 'v-click-outside'
import {
  PETS_MODULE_ACTIONS,
  PETS_MODULE_GETTERS,
  PETS_MODULE_MUTATIONS,
} from '~/store/constants/PetsModuleConstants'

Vue.use(vClickOutside)

const petsModule = namespace('modules/PetsModule')

@Component
export default class Filters extends Vue {
  @petsModule.Getter(PETS_MODULE_GETTERS.GET_CURRENT_FILTER) currentFilter: string
  @petsModule.Mutation(PETS_MODULE_MUTATIONS.SET_CURRENT_FILTER) setCurrentFilter: (filterStatus: string) => void
  @petsModule.Mutation(PETS_MODULE_MUTATIONS.SET_LOADING) setLoading: (loading: boolean) => void
  @petsModule.Action(PETS_MODULE_ACTIONS.FETCH_PETS_BY_STATUS) fetchPetsByStatus: (status: string) => Promise<string>
  filtersOptions: Array<string> = ['available', 'pending', 'sold']
  dropdownActive: boolean = false

  setFilter(filter: string): void {
    this.setLoading(true)
    this.fetchPetsByStatus(filter).then(() => {
      this.setCurrentFilter(filter)
      this.setLoading(false)
    })
    this.dropdownActive = false
  }

  hideDropdown(): void {
    this.dropdownActive = false
  }
}
</script>

<style lang="scss">
.filters {
  margin: 45px 0 30px;

  &__wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
  }

  &__icon {
    display: inline-block;
    width: 15px;
    height: 10px;
    background-image: url('@/assets/dropdown.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin-left: 10px;
    transition: 0.25s transform ease;

    &.active {
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: 46px;
    right: 0;
    max-width: 180px;
    width: 100%;
    visibility: hidden;
    opacity: 0;
    transition: 0.25s opacity ease;
    border: 1px solid $border-color;
    z-index: 3;

    &.active {
      visibility: visible;
      opacity: 1;
    }

    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 20px;
      font-size: 18px;
      text-transform: capitalize;
      background-color: white;
      width: 100%;
      border-bottom: 1px solid $border-color;
      cursor: pointer;

      &:last-child {
        border-bottom: none;
      }
    }

    &-icon {
      display: inline-block;
      width: 15px;
      height: 10px;
      background-image: url('@/assets/check.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      margin-left: auto;
    }
  }

  &__btn {
    text-transform: capitalize;
    background-color: white;
    border: 1px solid $border-color;
    font-size: 18px;
    padding: 11px 25px;
    outline: none;
    cursor: pointer;
    border-radius: 3px;
    min-width: 155px;
  }
}
</style>
