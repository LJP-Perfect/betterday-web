<template>
  <div>
    <v-app>
      <v-content style="height: auto">
        <div class="habitboxs" v-for="habit in habits">
          <div style="width: 20%;"><img :src="habit.icon" style="width: 40px;margin: 5px;height: 40px;"/> </div>
          <div style="width: 55%;margin-top: 20px;font-size: 15px;font-weight: bold;">{{habit.name}}</div>
          <div style="width: 19%;margin-top: 10px;">
            <p style="font-weight: bold;font-size: 17px;text-align: right">{{habit.days}}天</p>
            <p style="font-size: 12px;margin-top: -10px;text-align: right">共计坚持</p>
          </div>
        </div>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import {getHabitData} from '@/api/habit'
export default{
  data(){
    return{
      habits: []
    }
  },
  created(){
    var user=JSON.parse(localStorage.getItem("user"))
    getHabitData(user.id).then(response =>{
      if(response.data.code==200){
        this.habits=response.data.data
      }
    })
  }
}
</script>
<style>
.habitboxs{
  display: flex;
  flex-wrap: wrap;
  width: 94%;
  margin: 3%;
  height: 60px;
  border: 1px black solid;
}
</style>
