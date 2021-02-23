<template>
  <div v-if="showPopup" class="popup">
    <div class="popup__content">
      <img :src="dogImageUrl()" alt="" class="popup__image" />
      <div v-if="!showResponseMessage" class="popup__content-wrapper">
        <p class="popup__description">Are you sure you want to buy this pet?</p>
        <p class="popup__description popup__description--info">
          Id: <b>{{ selectedPet.id }}</b>
        </p>
        <p class="popup__description popup__description--info">
          Name: <b>{{ selectedPet.name }}</b>
        </p>
        <p class="popup__description popup__description--info">
          Status: <b>{{ selectedPet.status }}</b>
        </p>
        <button
          type="button"
          class="btn btn--top-margin"
          @click="placeAnOrderAction"
        >
          Buy
        </button>
      </div>
      <p v-else class="popup__description" :class="responseClasses">
        {{ responseText }}
      </p>
      <span class="popup__close" @click="showPopup = false"></span>
    </div>
    <div class="popup__blackout"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import {
  PETS_MODULE_ACTIONS,
  PETS_MODULE_GETTERS,
  Pet,
} from '~/store/constants/PetsModuleConstants'

const petsModule = namespace('modules/PetsModule')

@Component
export default class Popup extends Vue {
  @petsModule.Getter(PETS_MODULE_GETTERS.GET_POST_ERROR) postError: boolean
  @petsModule.Action(PETS_MODULE_ACTIONS.POST_PLACE_AN_ORDER) postPlaceAnOrder: (petData: Pet) => Promise<void>
  showPopup: boolean = false
  showResponseMessage: boolean = false
  selectedPet!: Pet

  mounted(): void {
    this.$root.$on('showPopup', this.setPopup)
  }

  setPopup(petData: Pet): void {
    this.showResponseMessage = false
    this.selectedPet = petData
    this.showPopup = true
  }

  dogImageUrl(): string {
    return `https://placedog.net/300/300?random&ref=${Math.random()}`
  }

  placeAnOrderAction(): void {
    this.postPlaceAnOrder(this.selectedPet).then(() => {
      this.showResponseMessage = true
    })
  }

  get responseText(): string {
    return this.postError
      ? 'Something went wrong, please try again.'
      : 'Thank you for your purchase!'
  }

  get responseClasses() {
    return {
      'popup__description--red': this.postError,
      'popup__description--green': !this.postError,
    }
  }
}
</script>

<style lang="scss">
.popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &__description {
    font-size: 18px;
    text-align: center;
    max-width: 400px;
    margin: 15px 0;

    &--info {
      font-size: 16px;
      color: $grey;
      margin: 5px 0;
    }

    &--red {
      color: $error;
    }

    &--green {
      color: $btn-color;
    }
  }

  &__blackout {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: black;
    opacity: 0.6;
    z-index: 4;
  }

  &__image {
    width: 110px;
    height: 110px;
    border-radius: 50%;
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    padding: 20px;
    z-index: 5;
    background-color: white;
    border-radius: 3px;

    &-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }

  &__close {
    display: inline-block;
    width: 18px;
    height: 18px;
    background-image: url('@/assets/close.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    top: -30px;
    right: 0;
    filter: invert(1);
    cursor: pointer;
  }
}
</style>
