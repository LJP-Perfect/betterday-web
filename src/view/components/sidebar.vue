<template>
  <div>
    <v-app>
      <v-navigation-drawer
        v-model="drawer"
        fixed
        app
      >
        <v-list class="pa-1">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="http://freelee-blog.oss-cn-beijing.aliyuncs.com/images/avatar.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>freelee</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>contact_mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Contact</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-app>
  </div>
</template>

<script>
export default{
  data(){
    return{
    }
  },
  computed: {
    drawer: {
      get(){
        return localStorage.getItem('drawer') || null;
      },
      set(val){
        this.drawer=val
      }
    }
  },
  watch: {
    drawer(query){
      console.log(query)
    }
  }
}
</script>
