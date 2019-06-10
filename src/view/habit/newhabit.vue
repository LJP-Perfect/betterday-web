<template>
  <div >
    <v-app>
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>

              <v-flex  xs4 class="left_text">
                <span style="font-weight: bold;font-size: 25px;">新的习惯</span>
              </v-flex>
              <v-flex  xs4>
              </v-flex>
              <v-flex  xs2>
                <button style="background-color: #ECEFF0;width: 50px;height: 35px;border-radius: 5px;font-weight: bold" @click="cancelAdd()">取消</button>
              </v-flex>
              <v-flex  xs2>
                <button @click="saveHabit()" style="background-color: #5FB89A;color: #fff;width: 50px;height: 35px;border-radius: 5px;">保存</button>
              </v-flex>


              <v-flex  xs12>
              </v-flex>
             <v-flex style="margin-top: 22px;text-align: left;" xs2>
               <span style="font-size: 17px;font-weight: bold">名称:</span>
             </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="habitInsert.habit.name"
                  label="Name"
                ></v-text-field>
              </v-flex>
              <v-flex xs4 style="margin-top: 10px;">
                <v-dialog v-model="dialog" scrollable max-width="400px">
                  <template v-slot:activator="{ on }">
                    <button @click="habit_dialog()" style="background-color: #ECEFF0;width: 70px;height: 40px;border-radius: 5px;font-weight: bold">习惯仓库</button>
                  </template>
                  <v-card>
                    <v-card-title style="font-weight: bold">选择习惯</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text style="height: 350px;">
                      <div class="sys_habit_for">
                        <div v-for="(item,index) in habits" :key="index" class="sys_habit" :class="choose_habit_index==index?'active':''"  @click="choose_habit(index)">
                          <img width="30" :src="item.icon" />
                          <div>{{item.name}}</div>
                        </div>
                      </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="dialog = false">取消</v-btn>
                      <v-btn color="blue darken-1" flat @click="chooseHabit">确认</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>


              <v-flex  xs6 style="text-align: left;">
                <span style="font-weight: bold">挑选一个图标:</span>
              </v-flex>
              <v-flex  xs12>
                <div class="icon_for">
                  <div v-for="(item,index) in habitIcons" :key="index" class="icon" :class="choose_icon_index==index?'active':''"  @click="choose_icon(index)">
                    <img width="30" :src="item" />
                  </div>
                </div>
              </v-flex>
              <v-flex  xs12>
              </v-flex>


              <v-flex  xs6 style="text-align: left;">
                <span style="font-weight: bold">在一天中什么时候:</span>
              </v-flex>
              <v-flex  xs12 >
                <div class="daytimes">
                  <div class="daytime" :class="choose_day_index==index?'active':''" v-for="(daytime,index) in daytimes" @click="choose_day(index)">
                    <div   >
                      <span style="font-weight: bold;font-size: 13px;">{{daytime.name}}</span>
                    </div>
                  </div>
                  <div class="daytime">
                    <div >
                      <span @click="dialog2=true">添加</span>
                    </div>
                  </div>
                </div>
              </v-flex>
              <v-dialog v-model="dialog2" max-width="500px">
                <v-card>
                  <v-card-title>
                    习惯情境
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="timeName"
                      label="Name"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" flat @click="dialog2=false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-flex  xs12>
              </v-flex>


              <v-flex  xs6 style="text-align: left;">
                <span style="font-weight: bold">在一周中什么时候:</span>
              </v-flex>
              <v-flex  xs12 >
                <div class="weekdays">
                  <div class="weekday" :class="weekday.checked==true?'active':''" v-for="weekday in weekdays">
                    <div  @click="weekday.checked=!weekday.checked" >
                      <span style="font-weight: bold;font-size: 13px;">{{weekday.name}}</span>
                    </div>
                  </div>
                </div>
              </v-flex>
              <v-flex  xs12>
              </v-flex>
              <v-flex  xs6 style="text-align: left;">
                <span style="font-weight: bold">写点什么吧:</span>
              </v-flex>
              <v-flex  xs12 >
                <div>
                  <input v-model="habitInsert.habit.description" style="width: 100%;height: 35px;border-radius: 5px;background-color: #E8E8E8" placeholder=" 坚持就是胜利"/>
                </div>
              </v-flex>
            </v-layout>

          </v-container>
    </v-app>
  </div>
</template>
<script>
import {getHabitIcons,getPublicHabits,getAllTimes,addHabit} from '@/api/habit'
export default{
  data(){
    return{
      timeName: '',
      choose_habit_index: -1,
      choose_icon_index: -1,
      choose_day_index: -1,
      habitInsert:{
        userId: undefined,
        habit: {
          name: '',
          icon: '',
          timeId: undefined,
          weekdays: '',
          description: '',
          isPublic: 0,
          isDelete: 0
        }
      },
      weekdays:[
        {id: 1,name: "周一",checked: true},
        {id: 2,name: "周二",checked: true},
        {id: 3,name: "周三",checked: true},
        {id: 4,name: "周四",checked: true},
        {id: 5,name: "周五",checked: true},
        {id: 6,name: "周六",checked: true},
        {id: 7,name: "周七",checked: true},
      ],
      daytimes:[],
      dialog: false,
      dialog2: false,
      habits: [],
      habitIcons: []
    }
  },
  created(){
    var user=JSON.parse(localStorage.getItem("user"))
    getHabitIcons().then(response => {
      this.habitIcons=response.data.data
    })
    getPublicHabits().then(response => {
      this.habits=response.data.data
    })
    getAllTimes(user.id).then(response => {
      this.daytimes=response.data.data
    })
  },
  methods: {
    chooseHabit: function () {
      this.habitInsert.habit.name=this.habits[this.choose_habit_index].name
      for(var i=0;i<this.habitIcons.length;i++){
        if(this.habits[this.choose_habit_index].icon===this.habitIcons[i]){
          this.choose_icon_index=i
          break;
        }
      }
      for(var i=0;i<this.daytimes.length;i++){
        if(this.habits[this.choose_habit_index].timeId===this.daytimes[i].id){
          this.choose_day_index=i
          break;
        }
      }
      console.log(this.habits[this.choose_habit_index].weekdays)
      for(var i=0;i<this.weekdays.length;i++){
        if(this.habits[this.choose_habit_index].weekdays.indexOf(this.weekdays[i].id)!==-1){
          this.weekdays[i].checked=true
        }else{
          this.weekdays[i].checked=false
        }
      }
      this.dialog=false
    },
    choose_habit: function (index) {
      this.choose_habit_index=index
    },
    choose_icon: function (index) {
      this.choose_icon_index=index
    },
    choose_day: function (index) {
      this.choose_day_index=index
    },
    habit_dialog: function(){
      this.dialog=true
    },
    cancelAdd: function(){
      this.$router.push("/habit")
    },
    saveHabit: function () {
      if(this.choose_icon_index==-1 || this.choose_day_index==-1){
        this.$toasted.show("创建失败,数据未填写完整", {
          type: "error",
          position: "top-center",
          duration : 2000
        })
      }else{
        var user=JSON.parse(localStorage.getItem("user"))
        this.habitInsert.habit.icon=this.habitIcons[this.choose_icon_index]
        this.habitInsert.habit.timeId=this.daytimes[this.choose_day_index].id
        var weekdayStr=''
        for(var i = 0; i < this.weekdays.length; i++){
          if(this.weekdays[i].checked==true){
            if(weekdayStr===""){
              weekdayStr=this.weekdays[i].id
            }else{
              weekdayStr= weekdayStr+","+this.weekdays[i].id
            }
          }
        }
        this.habitInsert.habit.weekdays=weekdayStr
        this.habitInsert.userId=user.id
        console.log(this.habitInsert)
        addHabit(this.habitInsert).then(response => {
          if(response.data.code==200){
            this.$toasted.show("创建成功", {
              type: "success",
              position: "top-center",
              duration : 2000
            })
            this.$router.push("/habit")
          }else{
            this.$toasted.show("创建失败,系统出错", {
              type: "error",
              position: "top-center",
              duration : 2000
            })
          }
        })

      }
    }
  }
}
</script>
<style>
#newhabit{
}
.left_text{
  text-align: left;
}
.sys_habit{
  width: 25%;
  border-radius: 10px;
}

.sys_habit_for .active{
  background: #EDF0F1;
}

.sys_habit_for{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}
.icon{
  width: 20%;
  border-radius: 10px;
}
.icon_for .active{
  background: #DEDEDE;
}
.icon_for{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}
.weekdays {
  overflow-y:hidden;
  overflow-x:auto;
  white-space: nowrap;
}
.weekday {
  display: inline-table;
  border: 2px solid #E8E8E8;
  background-color: #E8E8E8;
  text-align: center;
  line-height: 40px;
  margin: 5px;
  width: 20%;
  width: 50px;
  height: 40px;
  border-radius: 5px;
}

.weekdays .active{
  background-color: #F5D76E;
  border: 2px black solid;
}

.daytimes {
  overflow-y:hidden;
  overflow-x:auto;
  white-space: nowrap;
}
.daytime {
  border-radius: 5px;
  border: 2px solid #E8E8E8;
  background-color: #E8E8E8;
  display: inline-table;
  vertical-align: top;
  margin: 5px;
  width: 70px;
  height: 30px;
}

.daytimes .active{
  background-color: #F5D76E;
  border: 2px black solid;
}

</style>

