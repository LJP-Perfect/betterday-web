<template>
  <div>
    <v-app>
      <v-toolbar color="#03897C" dark fixed app>
        <v-toolbar-title>Hello</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon  @click="teamDialog = true"> add</v-icon>
        </v-btn>

      </v-toolbar>
      <router-view />

      <v-dialog v-model="teamDialog" persistent max-width="600px">
        <v-card>
            <v-tabs fixed-tabs  v-model="activeTab" centered>
              <v-tab :key="0" @click="addTeam">
                加入团队
              </v-tab>
              <v-tab :key="1" @click="createTeam" >
                创建团队
              </v-tab>
              <v-tab-item :key="0">
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="joinParam.name" label="团队名称" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="joinParam.password" label="团队密码" required></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-tab-item>
              <v-tab-item :key="1">
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="team.name" label="团队名称" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="team.password" label="团队密码" required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <small>*团队编码系统会自动生成</small>
                  </v-container>
                </v-card-text>
              </v-tab-item>
            </v-tabs>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="teamDialog = false">关闭</v-btn>
            <v-btn color="blue darken-1" flat @click="operateTeam">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-bottom-nav
        :active.sync="bottomNav"
        color="#03897C"
        :value="true"
        fixed
        app
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
    </v-app>
  </div>
</template>

<script>

  import store from '../../store'
  import BottomNav from '../components/bottomnav.vue'
  import {createTeam,joinTeam} from '@/api/team'
  export default {
    inject:['reload'],
    components: {
      BottomNav,
    },
    store,
    data: () => ({
      teamDialog: false,
      drawer: null,
      bottomNav: 2,
      activeTab: 0,
      team: {
        name: '',
        capitalId: undefined,
        password: ''
      },
      joinParam: {
        name: '',
        userId: undefined,
        password: ''
      }
    }),

    props: {
      source: String
    },
    methods:{
      operateTeam: function () {
        var user=JSON.parse(localStorage.getItem("user"))
        if(this.activeTab==1){
          this.team.capitalId=user.id
          createTeam(this.team).then(response =>{
            if(response.data.code==200){
              this.$toasted.show("创建成功", {
                type: "success",
                position: "top-center",
                duration : 2000
              })
            }
            this.teamDialog=false
          })
        }else{
          this.joinParam.userId=user.id
          joinTeam(this.joinParam).then(response =>{
            if(response.data.code==200){
              this.$toasted.show("加入成功", {
                type: "success",
                position: "top-center",
                duration : 2000
              })
              this.teamDialog=false
            }else{
              this.$toasted.show("加入失败，密码错误", {
                type: "error",
                position: "top-center",
                duration : 2000
              })
            }

          })
        }
        this.reload()
      },
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
      addTeam: function () {
        this.activeTab=0
      },
      createTeam: function () {
        this.activeTab=1
      }

    }
  }
</script>

<style>

</style>
