<template>
  <div>
    <v-app>
      <v-content>
        <v-list subheader>
          <v-subheader>我创建的团队</v-subheader>
          <v-list-tile
            v-for="item in teams.capitalTeams"
            :key="item.name"
            avatar
            @click=""
          >
            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon @click="viewTeam(item.id,item.name,true)">mdi-music-note-whole</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list subheader>
          <v-subheader>我加入的团队</v-subheader>

          <v-list-tile
            v-for="item in teams.teammateTeams"
            :key="item.name"
            avatar
            @click="viewTeam(item.id,item.name,false)"
          >
            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>mdi-music-note-whole</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

      </v-content>
    </v-app>
  </div>
</template>
<script>
  import {getAllTeams} from '@/api/team'
  export default {

    data () {
      return {
        teams: {
          capitalTeams: [],
          teammateTeams: []
        }
      }
    },
    created(){
      var user=JSON.parse(localStorage.getItem("user"))
      getAllTeams(user.id).then(response =>{
        this.teams=response.data.data
      })
    },
    methods:{
      viewTeam: function (id,name,isCapital) {
        this.$router.push({
          path: '/hello/team',
          query: {
            id: id,
            name: name,
            isCapital: isCapital
          }
        })
      },

    },

  }
</script>
