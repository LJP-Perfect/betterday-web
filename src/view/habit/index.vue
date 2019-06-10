<template>
  <div>
    <v-app>
      <v-toolbar color="#00B2A2" dark fixed app>
        <v-toolbar-title>Habit</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click="showData()">apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon  @click="addHabit()"> add</v-icon>
        </v-btn>
      </v-toolbar>

      <router-view></router-view>

      <v-bottom-nav
        :active.sync="bottomNav"
        color="#00B2A2"
        :value="true"
        dark
        shift
        fixed
        app
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

    </v-app>
  </div>
</template>

<script>
import BottomNav from '../components/bottomnav.vue'
export default {
  components: {
    BottomNav,
  },
  data: () => ({
    drawer: null,
    bottomNav: 0,
    router_link: [
      '/habit/data',
      '/habit/check'
    ]
  }),
  props: {
    source: String
  },
  methods:{
    to_habbit: function(){
      this.$router.push('/habit')
    },
    to_schedule: function(){
      this.$router.push('/schedule')
    },
    to_info: function(){
      this.$router.push('/info/index')
    },
    to_hello: function(){
      this.$router.push('/hello/data')
    },
    addHabit: function () {
      this.$router.push("/habit/add")
    },
    showData: function () {
      if(this.$route.path===this.router_link[0]){
        this.$router.push(this.router_link[1])
      }else if(this.$route.path===this.router_link[1]){
        this.$router.push(this.router_link[0])
      }

    }
  }
}
</script>

<style>

</style>
