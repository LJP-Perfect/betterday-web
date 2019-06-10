<template>
  <div>
    <v-app>
      <v-content >
        <div class="div_list">
          <div class="icon"><v-icon @click="backToTeams" large style="padding: 2.8px 0">mdi-chevron-left</v-icon></div>
          <div class="teamhead">{{teamName}}</div>
        </div>
        <div class="line"></div>
        <div>
          <v-layout row wrap style="padding: 0 5%;margin-top: 5px;">
            <v-flex xs12>
              <v-card color="#FAFAFA" class="white--text">
                <v-layout>
                  <v-flex xs5>
                    <img
                      :src="capitalUser.avatar"
                      height="100px"
                      style="margin-top: 7px;margin-left: 7px;border-radius: 50% ;"
                      contain
                    ></img>
                  </v-flex>
                  <v-flex xs7>
                    <v-card-title >
                      <div style="color: black">
                        <div class="headline">{{capitalUser.statusstr}}</div>
                        <div>{{capitalUser.name}}</div>
                        <div>{{capitalUser.realname}}</div>
                      </div>
                    </v-card-title>
                    <v-card-actions class="pa-0">
                      <v-spacer></v-spacer>
                      <v-btn v-if="this.isCapital" flat color="blue" @click="editStatusDialog = true">编辑</v-btn>
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex
              v-for="(item, index) in teammates"
              xs12
            >
              <v-list one-line>
                <template >

                  <v-divider
                    v-if="true"
                    :key="index"
                    :inset="false"
                  ></v-divider>

                  <v-list-tile
                    v-if="item.name"
                    :key="item.name"
                    avatar
                    @click=""
                  >
                    <v-list-tile-avatar>
                      <img :src="item.avatar">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.status"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.name"></v-list-tile-sub-title>
                      <v-list-tile-sub-title v-html="item.realname"></v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-icon v-if="isCapital==true" @click="dropoutHandler(item.id,item.name,index)">mdi-exit-to-app</v-icon>
                      <v-icon v-if="isCapital==false || item.id==currentUserId" @click="editStatusDialog=true">mdi-pencil</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
              </v-list>
            </v-flex>

            <v-dialog
              v-model="dropoutDialog"
              max-width="290"
            >
              <v-card>
                <v-card-title class="headline">踢出成员</v-card-title>

                <v-card-text>
                  您确定要将成员{{dropUser.name}}踢出
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    flat="flat"
                    @click="dropoutDialog = false"
                  >
                    取消
                  </v-btn>

                  <v-btn
                    color="red darken-1"
                    flat="flat"
                    @click="dropout()"
                  >
                    确定
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="editStatusDialog" persistent max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="headline">修改状态</span>
                </v-card-title>
                <v-card-text>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="status" label="请输入状态"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="editStatusDialog = false">关闭</v-btn>
                  <v-btn color="blue darken-1" flat @click="updateStatus">保存</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
        </div>
        <div></div>
      </v-content>
    </v-app>
  </div>
</template>
<script>
  import {getTeammates,dropoutUser} from '@/api/team'
  import {updateStatus} from '@/api/user'
  export default{
    inject:['reload'],
    data(){
      return{
        currentUserId: undefined,
        status: '',
        isCapital: null,
        teamName: '',
        dropoutDialog: false,
        editStatusDialog: false,
        dropUser: {
          id: undefined,
          name: '',
          index: undefined
        },
        capitalUser: {
          avatar: '',
          statusstr: '',
          name: 'name',
          realname: ''
        },
        teammates: []
      }
    },
    methods:{
      dropoutHandler:function (id,name,index) {
        this.dropoutDialog=true
        this.dropUser.id=id
        this.dropUser.name=name
        this.dropUser.index=index
      },
      dropout:function () {
        dropoutUser(this.$route.query.id,this.dropUser.id).then(response =>{
          if(response.data.code==200){
            this.dropoutDialog=false
            this.teammates.splice(this.dropUser.index, 1)
            this.$toasted.show("踢出成员成功", {
              type: "success",
              position: "top-center",
              duration: 2000
            })
          }
        })
      },
      updateStatus: function () {
        var user=JSON.parse(localStorage.getItem("user"))
        updateStatus(user.id,this.status).then(response =>{
          if(response.data.code==200){
            this.editStatusDialog=false
            this.$toasted.show("状态修改成功", {
              type: "success",
              position: "top-center",
              duration: 2000
            })
            this.reload()
          }
        })
      },
      backToTeams:function () {
        this.$router.push("/hello/data")
      }
    },
    created(){
      this.isCapital=this.$route.query.isCapital
      this.teamName=this.$route.query.name
      console.log(this.isCapital)
      var user=JSON.parse(localStorage.getItem("user"))
      this.currentUserId=user.id
      getTeammates(this.$route.query.id,user.id).then(response =>{
        console.log(response.data.data)
        this.teammates=response.data.data.teammateVOList
        console.log(this.teammates)
        this.capitalUser=response.data.data.capitalUser
      })
    }
  }
</script>
<style>
.icon{
  width: 20%;
}
.teamhead{
  width: 60%;
  text-align: center;
  font-size: 28px;
}

.line{
  height: 1px;
  border-top: 1px solid #ddd;
  text-align: center;
}
.div_list{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}
</style>
