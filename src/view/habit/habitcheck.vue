<template>
  <div>
    <v-app>
      <v-content style="overflow: scroll">
        <v-divider class="mt-3"></v-divider>
        <v-layout
          my-1
          align-center
        >
          <strong class="mx-3 info--text text--darken-3">
            Remaining: {{ remainingTasks }}
          </strong>

          <v-divider vertical></v-divider>

          <strong class="mx-3 black--text">
            Completed: {{ completedTasks }}
          </strong>

          <v-spacer></v-spacer>

          <v-progress-circular
            :value="progress"
            class="mr-2"
          ></v-progress-circular>
        </v-layout>

        <v-list>
          <v-list-group
            v-for="(item,habitIndex) in habits"
            :key="item.title"
            :prepend-icon="item.action"
            no-action
            value="true"
          >
            <template v-slot:activator>
              <v-list-tile>
                <div style="background-color: #F5F6F7;font-weight: bold; ">{{ item.title }}</div>
              </v-list-tile>
            </template>

            <v-list-tile
              v-for="(subItem,index) in item.items"
              :key="subItem.title"
              @click="check(habitIndex,index)"
            >
              <v-list-tile-content>
                <div :class="subItem.checked==true?'checkactive':''"><img style="margin-right: 20px" :src="subItem.icon" height="15px" /> <span> {{ subItem.title }}</span></div>
              </v-list-tile-content>

            </v-list-tile>
          </v-list-group>
        </v-list>

        <v-dialog
          v-model="noticeDialog"
          width="500"
        >
          <v-card>
            <v-card-title
              class="headline"
              primary-title
            >
              今日提醒
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div>
                <span class="grey--text" style="font-size: 17px">习惯</span><br>
                <span>已打卡：<span style="font-size: 22px;font-weight: bold;color: darkgreen">{{ completedTasks }}</span></span>
                <span style="margin-left: 20px">未打卡：<span style="font-size: 22px;font-weight: bold;color: darkred">{{ remainingTasks }}</span></span>
              </div>
            </v-card-text>
            <v-card-text>
              <div>
                <span class="grey--text" style="font-size: 17px">日程</span><br>
                <span><span style="font-size: 22px;font-weight: bold;color: darkblue">{{todayEventNums}}</span>项日程安排</span>
              </div>
            </v-card-text>
            <v-card-text>
              <div>
                <span class="grey--text" style="font-size: 17px">团队通知</span><br>
                <span>暂无</span>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="noticeDialog = false"
              >
                确定
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import {getTodayHabits,checkHabit} from '@/api/habit'
import {getTodayEvents} from '@/api/event'
export default{
  data: () => ({
    completeTaskNum: 1,
    remainingTaskNum: 4,
    habits: [],
    todayEventNums: -1,
    noticeDialog: false,
    habitCheckParam: {
      userId: undefined,
      habitId: undefined
    }
  }),
  methods:{
    check(tIndex,index){
      if(this.habits[tIndex].items[index].checked==false){
        var user=JSON.parse(localStorage.getItem("user"))
        this.habitCheckParam.habitId=this.habits[tIndex].items[index].id
        this.habitCheckParam.userId=user.id
        this.habits[tIndex].items[index].checked = true
        checkHabit(this.habitCheckParam).then(response => {

        })
      }

    }
  },
  created(){
    var user=JSON.parse(localStorage.getItem("user"))
    if(this.$route.query.show!==undefined){
      if(localStorage.getItem("show")==='true'){
        getTodayEvents(user.id).then(response =>{
          this.todayEventNums=response.data.data.length
          this.noticeDialog=true
          localStorage.setItem("show",false)
        })
      }

    }
    getTodayHabits(user.id).then(response => {
      if(response.data.code==200){
        this.habits=response.data.data
      }
    })
  },
  computed: {
    completedTasks () {
      var num=0
      for(var i = 0; i < this.habits.length; i++){
        for(var j=0;j< this.habits[i].items.length;j++){
          if(this.habits[i].items[j].checked){
            num++
          }
        }
      }
      return num
    },
    progress () {
      return this.completedTasks / (this.completedTasks+this.remainingTasks) * 100
    },
    remainingTasks () {
      var num=0
      for(var i = 0; i < this.habits.length; i++){
        for(var j=0;j< this.habits[i].items.length;j++){
          num++
        }
      }
      return num - this.completedTasks
    }
  },

}
</script>
<style>

.checkactive{
  color: grey;
  text-decoration:line-through
}
</style>
