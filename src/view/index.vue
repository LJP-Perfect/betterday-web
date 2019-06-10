<template>
  <div>
    <v-app>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import store from '../store'
import BottomNav from './components/bottomnav.vue'
export default{
  components:{
    BottomNav
  }
}
</script>

<style>
</style>
