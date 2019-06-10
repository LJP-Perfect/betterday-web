<template>
  <div>
    <v-app>
      <v-toolbar color="#009B8B" dark fixed app>
        <v-toolbar-title>Schedule</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon  @click="addSchedule"> add</v-icon>
        </v-btn>

      </v-toolbar>
      <router-view></router-view>

      <v-layout row justify-center>

        <v-dialog v-model="scheduleAddDialog" persistent max-width="600px">

          <v-card>
            <v-card-title>
              <span class="headline">添加行程</span>
            </v-card-title>
            <v-card-text>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field label="行程名" v-model="addEvent.title"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field label="描述(可选)" v-model="addEvent.description"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <el-date-picker
                      style="width: auto"
                      format="yyyy-MM-dd HH:mm"
                      v-model="addEvent.start"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm"
                      placeholder="选择开始时间">
                    </el-date-picker>
                  </v-flex>
                  <v-flex xs12 sm6 md4 style="margin-top: 10px;">
                    <el-date-picker
                      style="width: auto"
                      format="yyyy-MM-dd HH:mm"
                      v-model="addEvent.end"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm"
                      placeholder="选择结束时间">
                    </el-date-picker>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-checkbox
                      v-model="addEvent.isPrivateBoolean"
                      label="是否为私人行程"
                      required
                    ></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-combobox
                      v-model="addEvent.priority"
                      :items="priorityItems"
                      label="行程优先级"
                    ></v-combobox>
                  </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="scheduleAddDialog = false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="createEvent">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <v-bottom-nav
        :active.sync="bottomNav"
        color="#009B8B"
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
  import {createEvent} from '@/api/event'
  import store from '../../store'
  import BottomNav from '../components/bottomnav.vue'
  export default {
    inject:['reload'],
    components: {
      BottomNav,
    },
    store,
    data: () => ({
      drawer: null,
      addEvent: {
        userId: undefined,
        title: '',
        priority: '',
        isPrivateBoolean: false,
        isPrivate: '',
        end: '',
        start: '',
        description: "",
      },
      resetEvent: {
        userId: undefined,
        title: '',
        priority: '',
        isPrivateBoolean: false,
        isPrivate: '',
        end: '',
        start: '',
        description: "",
      },
      priorityItems: [
        '高',
        '中',
        '低',
      ],
      bottomNav: 1,
      scheduleAddDialog: false,


    }),
    created(){

      //this.$store.commit('changeBottomNav', '1');
    },
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
      addSchedule: function () {
        console.log(this.resetEvent)
        Object.assign(this.addEvent,this.resetEvent)
        this.scheduleAddDialog=true
      },
      createEvent: function () {
        var user=JSON.parse(localStorage.getItem("user"))
        this.addEvent.userId=user.id
        var start = new Date(this.addEvent.start);
        var end = new Date(this.addEvent.end);
        if(this.addEvent.title==''||this.addEvent.start==''||this.addEvent.end==''||this.addEvent.priority==''){
          this.$toasted.show("创建失败,数据填写不完整", {
            type: "error",
            position: "top-center",
            duration : 2000
          })
        }else if(start.getTime() > end.getTime()){
          this.$toasted.show("创建失败,日期选择出错", {
            type: "error",
            position: "top-center",
            duration : 2000
          })
        }else{
          if(this.addEvent.isPrivateBoolean){
            this.addEvent.isPrivate=1
          }else{
            this.addEvent.isPrivate=0
          }
          console.log(this.addEvent)
          createEvent(this.addEvent).then(response => {
            if(response.data.code==200){
              this.reload()
              this.$toasted.show("创建成功", {
                type: "success",
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
.el-time-panel__footer{
  margin-right: 20px;
}
</style>
