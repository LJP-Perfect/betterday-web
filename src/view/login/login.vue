<template>
  <div id="login">

      <v-content >
        <v-container fluid login-fill-height >
          <div style="text-align: center;margin-bottom: 18%;">
            <img width="50%" src="../../assets/betterday.png"/>
          </div>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>登录</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <v-btn icon large @click="toRegister" target="_blank" v-on="on">
                        <v-icon large>mdi-account-plus-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>注册</span>
                  </v-tooltip>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field prepend-icon="person" name="login" label="用户名" v-model="loginParam.username" type="text"></v-text-field>
                    <v-text-field id="password" prepend-icon="lock" name="password" label="密码" v-model="loginParam.password" type="password"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="login">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
  </div>

</template>

<script>
  import {login,getUserByName} from '@/api/user'
  export default {
    data: () => ({
      drawer: null,
      loginParam: {
        username: '',
        password: ''
      },
    }),
    methods: {

      toRegister: function () {
        this.$router.push("/register")
      },
      login: function () {
        if(this.loginParam.name=='' || this.loginParam.password==''){
          this.$toasted.show("登录失败，信息填写不完整", {
            theme: "outline",
            position: "top-center",
            duration : 3000
          })
        }else{
          login(this.loginParam).then((response) => {
            if(response.data.code==200){
              this.$toasted.show("登录成功", {
                type: "success",
                position: "top-center",
                duration : 2000
              })
              var token=response.data.data
              this.$store.commit('setToken', token);
              getUserByName(response.data.username).then(r =>{
                if(r.data.code==200){
                  localStorage.setItem("user",JSON.stringify(r.data.data))
                  localStorage.setItem("show",true)
                  this.$router.push({
                    path: "/habit",
                    query: {
                      show: true
                    }
                  })
                }
              })

            }else{
              this.$toasted.show(response.data.message, {
                type: "error",
                position: "top-center",
                duration : 3000
              })
            }
          }, (error) => {
            this.$toasted.show("登录失败", {
              type: "error",
              position: "top-center",
              duration : 2000
            })
          })
        }

      }
    },
    props: {
      source: String
    }
  }
</script>
<style>
.el-message{
  top: -100px;
}
#login{
  width: 100%;
  height: 100%;
  background-image: url("../../assets/login_bg.jpg");
  background-size: 100% 100%;

}
.container.login-fill-height{
  margin-top: 25%;
}
</style>
