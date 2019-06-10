<template>
  <div>
    <v-app>

      <v-toolbar color="#008376" dark fixed app>
        <v-toolbar-title>Me</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-content>
        <div class="div_for">
          <div style="width: 30%">
              <img width="75px" height="75px" style="border-radius: 50%;border: 7px solid white ;margin-top: 15px" :src="user.avatar" />
          </div>

          <div style="width: 70%;margin-top: 15px;">
            <div style="font-size: 25px;color: #585655;">{{user.name}}</div>
            <div style="color: #BEADA0;font-size: 17px;">{{user.email}}</div>
          </div>
        </div>
        <v-list one-line>
          <v-subheader>功能</v-subheader>

          <v-list-tile @click="processing">
            <v-list-tile-action>
              <v-icon color="indigo">mdi-bulletin-board</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>团队通知</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile @click="processing">
            <v-list-tile-action>
              <v-icon color="indigo">mdi-message-alert</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>系统公告</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile @click="changePwdDialog = true">
            <v-list-tile-action>
              <v-icon color="indigo">mdi-lock</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>密码修改</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile @click="processing">
            <v-list-tile-action>
              <v-icon color="indigo">mdi-settings-outline</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>系统设置</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-tile-action>
          </v-list-tile>


          <v-list-tile @click="processing">
            <v-list-tile-action>
              <v-icon color="indigo">mdi-message-alert</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>意见反馈</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile @click="logout">
            <v-list-tile-action>
              <v-icon color="indigo">mdi-exit-to-app</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>退出</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-tile-action>
          </v-list-tile>



        </v-list>

        <v-dialog v-model="changePwdDialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">修改密码</span>
            </v-card-title>
            <v-card-text>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field type="password" v-model="oldPwd" label="请输入原密码"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field type="password" v-model="newPwd" label="请输入新密码"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field type="password" v-model="newPwdConfirm" label="请再次输入新密码"></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="changePwdDialog = false">关闭</v-btn>
              <v-btn color="blue darken-1" flat @click="updatePwd">确定</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-content>

      <v-bottom-nav
        :active.sync="bottomNav"
        color="#008376"
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
  import {updatePwd} from '@/api/user'
  export default {
    components: {
      BottomNav,
    },
    store,
    data: () => ({
      oldPwd: '',
      newPwd: '',
      newPwdConfirm: '',
      changePwdDialog: false,
      user: {
        name: '',
        email: '',
        avatar: ''
      },
      drawer: null,
      bottomNav: 3,

    }),

    props: {
      source: String
    },
    created(){
      var user=JSON.parse(localStorage.getItem("user"))
      this.user.name=user.name
      this.user.email=user.email
      this.user.avatar=user.avatar
    },
    methods:{
      logout: function () {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        this.$router.push("/login")
      },
      updatePwd: function () {
        var user=JSON.parse(localStorage.getItem("user"))
        if(this.newPwd!==this.newPwdConfirm){
          this.$toasted.show("修改失败，两次密码不一致", {
            type: "error",
            position: "top-center",
            duration : 3000
          })
        }else{
          updatePwd(user.name,this.oldPwd,this.newPwd).then(response =>{
            if(response.data.code==200){
              this.$toasted.show(response.data.message, {
                type: "success",
                position: "top-center",
                duration : 3000
              })
              this.changePwdDialog=false
              this.logout()
            }else{
              this.$toasted.show(response.data.message, {
                type: "error",
                position: "top-center",
                duration : 3000
              })
            }
          })
        }

      },
      processing: function () {
        this.$toasted.show("该功能正在加紧开发中...", {
          type: "info",
          position: "top-center",
          duration : 2000
        })
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

    }
  }
</script>

<style>
.div_for{
  background-color: #F9F3F0;
  height: 100px;
  border-radius: 5px;
  margin-top: 2.5%;
  width: 95%;
  margin-left: 2.5%;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}
</style>
