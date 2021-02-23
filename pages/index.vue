<template>
  <div class="container">
    <Filters></Filters>
    <PetsList></PetsList>
    <Popup></Popup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  box-sizing: border-box;

  @media (min-width: $breakpoint-small) {
    padding: 0 30px;
  }

  @media (min-width: $breakpoint-large) {
    padding: 0 45px;
  }
}

.btn {
  background-color: $btn-color;
  border-radius: 5px;
  padding: 8px 25px;
  font-size: 14px;
  color: white;
  border: none;
  outline: none;
  margin: auto 0 0;
  cursor: pointer;
  transition: 0.25s background-color ease;

  &:hover {
    background-color: $btn-hover-color;
  }

  &--top-margin {
    margin: 15px 0 0;
  }
}
</style>
