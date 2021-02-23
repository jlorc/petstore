<template>
  <div v-if="showPopup" class="popup">
    <div class="popup__content">
      <img :src="dogImageUrl()" alt="" class="popup__image" />
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
      <span class="popup__close" @click="showPopup = false"></span>
      <button type="button" class="btn btn--top-margin" @click="placeAnOrderAction">Buy</button>
    </div>
    <div class="popup__blackout"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Pet } from '~/store/constants/PetsModuleConstants'

@Component
export default class Popup extends Vue {
  showPopup: boolean = false
  selectedPet?: Pet

  mounted(): void {
    this.$root.$on('showPopup', this.setPopup)
  }

  setPopup(petData: Pet): void {
    this.selectedPet = petData
    this.showPopup = true
  }

  dogImageUrl(): string {
    return `https://placedog.net/300/300?random&ref=${Math.random()}`
  }

  placeAnOrderAction(): void {

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
