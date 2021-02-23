<template>
  <div v-if="isLoadingActive" class="loader">
    <div class="loader__element"></div>
    <div class="loader__blackout"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { PETS_MODULE_GETTERS } from '~/store/constants/PetsModuleConstants'

const petsModule = namespace('modules/PetsModule')

@Component
export default class Loader extends Vue {
  @petsModule.Getter(PETS_MODULE_GETTERS.GET_LOADING) isLoadingActive: boolean
}
</script>

<style lang="scss">
.loader {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &__blackout {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: white;
    opacity: 0.6;
    z-index: 1;
  }

  &__element {
    position: relative;
    font-size: 10px;
    margin: 100px auto;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(to right, $btn-color 10%, white 45%);
    animation: loader 1.4s infinite linear;
    transform: translateZ(0);

    &::before {
      content: '';
      width: 50%;
      height: 50%;
      background: $btn-color;
      border-radius: 100% 0 0 0;
      position: absolute;
      top: 0;
      left: 0;
    }

    &::after {
      content: '';
      width: 75%;
      height: 75%;
      background: white;
      border-radius: 50%;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }

    @keyframes loader {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
