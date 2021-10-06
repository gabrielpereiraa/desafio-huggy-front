<template>
  <div id="app">
    <transition leave-active-class="animate__animated animate__fadeOut" v-if="modalAlert.show">
      <app-modal-alert></app-modal-alert>
    </transition>

    <transition name="fade-view" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
  import AppModalAlert from './components/AppModalAlert.vue';

  import { mapGetters } from 'vuex';

  export default {
      name: "App",
      components: { AppModalAlert },
      computed: {
          ...mapGetters({
              modalAlert: 'getModalAlert'
          })
      }
  };
</script>

<style>

  @import './assets/styles/main.css';
  @import './assets/styles/custom.css';
  @import './assets/styles/svg-icons-animate.css';
  
</style>
