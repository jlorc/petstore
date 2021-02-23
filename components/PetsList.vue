<template>
  <div class="pets">
    <p class="pets__info" v-if="!isLoadingActive">
      <b>{{ petsList.length }}</b> results found for "{{ currentFilter }}"
    </p>
    <div class="pets__wrapper">
      <div v-for="(pet, index) in petsList" :key="index" class="pets__box">
        <div class="pets__image-wrapper">
          <img :src="dogImageUrl(index)" :alt="pet.name" class="pets__image" />
        </div>
        <span class="pets__name">{{ pet.name }}</span>
        <p v-if="pet.status === 'available'" class="pets__description">
          {{ pet.name }} is so cute!
        </p>
        <p v-else-if="pet.status === 'pending'" class="pets__description">
          This pet is waiting for family approval.
        </p>
        <p v-else class="pets__description">
          This pet has already found a family.
        </p>
        <button
          v-if="pet.status === 'available'"
          type="button"
          class="btn"
          @click="buyPetAction(pet)"
        >
          Buy
        </button>
      </div>
      <p v-if="!petsList.length && !isLoadingActive" class="pets__info">No pets found</p>
      <Loader></Loader>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import {
  PETS_MODULE_ACTIONS,
  PETS_MODULE_GETTERS,
  PETS_MODULE_MUTATIONS,
  Pet,
} from '~/store/constants/PetsModuleConstants'

const petsModule = namespace('modules/PetsModule')

@Component
export default class PetsList extends Vue {
  @petsModule.Getter(PETS_MODULE_GETTERS.GET_PETS_BY_STATUS) petsList: Array<Pet>
  @petsModule.Getter(PETS_MODULE_GETTERS.GET_CURRENT_FILTER) currentFilter: string
  @petsModule.Getter(PETS_MODULE_GETTERS.GET_LOADING) isLoadingActive: boolean
  @petsModule.Mutation(PETS_MODULE_MUTATIONS.SET_LOADING) setLoading: (loading: boolean) => void
  @petsModule.Action(PETS_MODULE_ACTIONS.FETCH_PETS_BY_STATUS) fetchPetsByStatus: (status: string) => Promise<string>

  created(): void {
    this.setLoading(true)
    this.fetchPetsByStatus(this.currentFilter).then(() => {
      this.setLoading(false)
    })
  }

  dogImageUrl(index: number): string {
    return `https://placedog.net/300/300?random&ref=${index}`
  }

  buyPetAction(petData: Pet): void {
    this.$root.$emit('showPopup', petData)
  }
}
</script>

<style lang="scss">
.pets {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 70px 0;
    position: relative;
  }

  &__box {
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 15px 10px;
    margin: 40px 15px;
    flex: 0 0 calc(100% - 30px);

    @media (min-width: $breakpoint-small) {
      flex: 0 0 calc(33.33% - 30px);
    }

    @media (min-width: $breakpoint-medium) {
      flex: 0 0 calc(25% - 30px);
    }
  }

  &__image {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    max-width: 120px;

    &-wrapper {
      position: relative;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      margin: -65px auto 0;
    }
  }

  &__description {
    margin: 10px 0 20px;
    text-align: center;
    word-break: break-word;
    max-width: 240px;
  }

  &__info {
    font-size: 18px;
  }

  &__name {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0;
    word-break: break-word;
    max-width: 240px;
    text-transform: capitalize;
  }
}
</style>
