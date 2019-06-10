<template>
  <div>
      <v-bottom-nav
        :active.sync="bottomNav"
        :color="color"
        :value="true"
        absolute
        dark
        shift
      >
        <v-btn dark @click="to_habbit()">
          <span>习惯</span>
          <v-icon>subject</v-icon>
        </v-btn>

        <v-btn dark @click="to_schedule()">
          <span>日程</span>
          <v-icon>assignment_turned_in</v-icon>
        </v-btn>

        <v-btn dark @click="to_hello()">
          <span>在吗</span>
          <v-icon>bubble_chart</v-icon>
        </v-btn>

        <v-btn dark @click="to_info()">
          <span>我的</span>
          <v-icon>person_pin</v-icon>
        </v-btn>
      </v-bottom-nav>
  </div>
</template>
<script>
import store from '../../store'
export default {
  data () {
    return {

    }
  },
  store,
  methods:{
    to_habbit: function(){
      this.$store.commit('changeBottomNav', 0);
      this.$router.push('/habit')
    },
    to_schedule: function(){
      this.$store.commit('changeBottomNav', 1);
      this.$router.push('/schedule')
    },
    to_info: function(){
      this.$store.commit('changeBottomNav', 2);
      this.$router.push('/info/index')
    },
    to_hello: function(){
      this.$store.commit('changeBottomNav', 3);
      this.$router.push('/hello/index')
    },
  },
//  created(){
//    if (window.location.pathname.indexOf('habit')) {
//      // console.log(window.location.pathname);
//      this.$store.commit('changeBottomNav', '0');
//      console.log(this.$store.state.bottomNav)
//    }
//  },
  computed: {
    color () {
      switch (this.bottomNav) {
        case 0: return '#5FB89A'
        case 1: return 'teal'
        case 2: return 'brown'
        case 3: return 'blue-grey'
      }
    },
    bottomNav:{
      get: function () {
        return this.$store.state.bottomNav;
      },
      set: function () {
      }
    }
  },

}
</script>
<style>

</style>
