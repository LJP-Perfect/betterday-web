<template>
  <div>
    <v-app>
      <v-content>
        <div style="text-align: center">
        </div>
        <v-divider ></v-divider>
        <FullCalendar
          :header="{
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }"
          :all-day-slot="true"
          :footer="{
            center: 'prev,next today',
          }"
          select-mirror="true"
          slot-duration="00:30"
          slot-label-format="HH:mm"
          eventLimit="true"
          navLinks="true"
          :selectable="true"
          :editable="true"
          :droppable="true"
          :durationEditable="true"
          nowIndicator="true"
          displayEventTime="true"
          defaultView="dayGridMonth"
          @dateClick="handleDateClick"
          :plugins="calendarPlugins"
          @select="select"
          @eventResize="eventResize"
          @eventDrop="eventDrop"
          @eventRender="eventRender"
          @eventClick="eventClick"
          :events="events"
        />
        <v-layout row justify-center>
          <v-dialog v-model="scheduleAddDialog" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">{{headline}}行程</span>
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
                      :default-time="['00:00:00', '00:00:00']">
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
                      :default-time="['00:00:00', '00:00:00']">
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
                <v-btn color="blue darken-1" flat @click="editEvent">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="showEvent" persistent max-width="600px">
            <v-flex xs12 sm6 offset-sm3>
              <v-card >
                <v-card-title >
                  <span class="headline">{{clickedEvent.title}}</span>
                  <v-spacer></v-spacer>
                  <v-menu bottom left transition="scale-transition">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        dark
                        icon
                        v-on="on"
                      >
                        <v-icon style="color: black;">more_vert</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-tile @click="updateEvents()">
                      <v-list-tile-title>编辑</v-list-tile-title>
                    </v-list-tile>
                      <v-list-tile @click="deleteEvent(clickedEvent.id)">
                        <v-list-tile-title>删除</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-card-title>
                <v-card-text><strong>开始时间：</strong>{{clickedEvent.start}}</v-card-text>
                <v-card-text><strong>结束时间：</strong>{{clickedEvent.end}}</v-card-text>
                <v-card-text><strong>描述：</strong>{{clickedEvent.description}}</v-card-text>
                <v-card-text><strong>私人行程：</strong>{{clickedEvent.isPrivate==0?'否':'是'}}</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="showEvent = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-dialog>
        </v-layout>
      </v-content>
    </v-app>
  </div>
</template>
<script>
import {getEvents,createEvent,getEventById,getEventVOById,deleteEvent,updateEvent} from '@/api/event'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import '@fullcalendar/core/locales/zh-cn'
import momentPlugin from '@fullcalendar/moment';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
export default{
  components: {
    FullCalendar
  },
  inject:['reload'],
  data(){
    return{
      headline: '',
      events: [],
      pickBeginDate: '',
      pickEndDate: '',
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
      clickedEvent: {
        userId: undefined,
        title: '',
        priority: '',
        isPrivateBoolean: false,
        isPrivate: '',
        end: '',
        start: '',
        description: "",
        backgroundColor: '',
        editable: null,
      },
      resetClickedEvent: {
        userId: undefined,
        title: '',
        priority: '',
        isPrivateBoolean: false,
        isPrivate: '',
        end: '',
        start: '2',
        description: "",
        backgroundColor: '',
        editable: null,
      },
      showEvent: false,
      scheduleAddDialog: false,
      calendarPlugins: [ dayGridPlugin,timeGridPlugin,interactionPlugin,momentPlugin],
      selectInfo: null
    }
  },
  created(){
    var user=JSON.parse(localStorage.getItem("user"))
    getEvents(user.id).then(response => {
      this.events=response.data.data
    })
  },
  methods:{
    updateEvents:function () {
      this.showEvent=false
      this.scheduleAddDialog=true
      Object.assign(this.addEvent,this.clickedEvent)
      this.addEvent.isPrivateBoolean=(this.clickedEvent.isPrivate==1?true:false)
      this.headline='更新'
    },
    handleDateClick(arg) {
      console.log(arg.date)
    },
    eventResize: function(info) {
      Object.assign(this.clickedEvent,this.resetClickedEvent)
      console.log(info.event.id)
      getEventVOById(info.event.id).then(response =>{
        Object.assign(this.clickedEvent,response.data.data)
        var start = new Date(info.event.start);
        var end=new Date(info.event.end);
        this.clickedEvent.end=end.getFullYear() + '-' + this.formatDate((end.getMonth() + 1)) + '-' + this.formatDate(end.getDate()) + ' ' + (end.getHours()<10?'0'+end.getHours():end.getHours()) + ':' + (end.getMinutes()<10?'0'+end.getMinutes():end.getMinutes())  ;
        this.clickedEvent.start=start.getFullYear() + '-' + this.formatDate((end.getMonth() + 1)) + '-' + this.formatDate(start.getDate()) + ' ' + (start.getHours()<10?'0'+start.getHours():start.getHours())+ ':' + (start.getMinutes()<10?'0'+start.getMinutes():start.getMinutes())  ;
        if((this.clickedEvent.start.split(" ")[1]=="00:00:00"||this.clickedEvent.start.split(" ")[1]=="00:00")
          &&(this.clickedEvent.end.split(" ")[1]=="00:00:00"||this.clickedEvent.end.split(" ")[1]=="00:00")){
          this.clickedEvent.start=this.clickedEvent.start.split(" ")[0]
          this.clickedEvent.end=this.clickedEvent.end.split(" ")[0]
        }
        updateEvent(this.clickedEvent).then(response =>{
        })
      })
    },
    formatDate: function(data){
      if(data<10){
        return '0'+data
      }else{
        return data
      }
    },
    eventDrop: function(info) {
      Object.assign(this.clickedEvent,this.resetClickedEvent)
      getEventVOById(info.event.id).then(response =>{
        Object.assign(this.clickedEvent,response.data.data)
        var start = new Date(info.event.start);
        var end=new Date(info.event.end);
        this.clickedEvent.end=end.getFullYear() + '-' + this.formatDate((end.getMonth() + 1)) + '-' + this.formatDate(end.getDate()) + ' ' + (end.getHours()<10?'0'+end.getHours():end.getHours()) + ':' + (end.getMinutes()<10?'0'+end.getMinutes():end.getMinutes())  ;
        this.clickedEvent.start=start.getFullYear() + '-' + this.formatDate((end.getMonth() + 1)) + '-' + this.formatDate(start.getDate()) + ' ' + (start.getHours()<10?'0'+start.getHours():start.getHours())+ ':' + (start.getMinutes()<10?'0'+start.getMinutes():start.getMinutes())  ;
        if((this.clickedEvent.start.split(" ")[1]=="00:00:00"||this.clickedEvent.start.split(" ")[1]=="00:00")
          &&(this.clickedEvent.end.split(" ")[1]=="00:00:00"||this.clickedEvent.end.split(" ")[1]=="00:00")){
          this.clickedEvent.start=this.clickedEvent.start.split(" ")[0]
          this.clickedEvent.end=this.clickedEvent.end.split(" ")[0]
        }
        updateEvent(this.clickedEvent).then(response =>{
        })
      })

    },
    deleteEvent: function (id) {
      deleteEvent(id).then(response =>{
        if (response.data.code == 200) {
          this.showEvent=false
          this.$toasted.show("删除成功", {
            type: "success",
            position: "top-center",
            duration: 2000
          })
          this.reload()
        }
      })
    },
    editEvent: function () {
        var user=JSON.parse(localStorage.getItem("user"))
        this.addEvent.userId=user.id
        if(this.addEvent.start!==''&&this.addEvent.end!==''){
          var start = new Date(this.addEvent.start);
          var end = new Date(this.addEvent.end);
        }
        if(this.addEvent.title==''||this.addEvent.start==''||this.addEvent.end==''||this.addEvent.priority==''){
          this.$toasted.show(this.headline+"失败,数据填写不完整", {
            type: "error",
            position: "top-center",
            duration : 2000
          })
        }else if(start.getTime() > end.getTime()){
          this.$toasted.show(this.headline+"失败,日期选择出错", {
            type: "error",
            position: "top-center",
            duration : 2000
          })
        }else{
          if((this.addEvent.start.split(" ")[1]=="00:00:00"||this.addEvent.start.split(" ")[1]=="00:00")
            &&(this.addEvent.end.split(" ")[1]=="00:00:00"||this.addEvent.end.split(" ")[1]=="00:00")){
            this.addEvent.start=this.addEvent.start.split(" ")[0]
            this.addEvent.end=this.addEvent.end.split(" ")[0]
          }
          if(this.addEvent.isPrivateBoolean){
            this.addEvent.isPrivate=1
          }else{
            this.addEvent.isPrivate=0
          }
          console.log(this.addEvent)
          if(this.headline=='添加') {
            createEvent(this.addEvent).then(response => {
              if (response.data.code == 200) {
                this.scheduleAddDialog=false
                this.$toasted.show(this.headline+"成功", {
                  type: "success",
                  position: "top-center",
                  duration: 2000
                })
                this.reload()
              }
            })
          }else if(this.headline=='更新'){
            updateEvent(this.addEvent).then(response =>{
              if (response.data.code == 200) {
                this.scheduleAddDialog=false
                this.$toasted.show(this.headline+"成功", {
                  type: "success",
                  position: "top-center",
                  duration: 2000
                })
                this.reload()
              }
            })
         }

        }

    },
    eventRender: function(info) {
//      console.log(info.event.extendedProps.description)
    },
    select: function(info){
        this.headline='添加'
        Object.assign(this.addEvent,this.resetEvent)
        if(info.startStr.indexOf('T')!== -1){
          this.addEvent.start=info.startStr.substr(0,info.startStr.indexOf('T'))+' '+info.start.toString().split(' ')[4]
        }else{
          this.addEvent.start=info.startStr+' '+info.start.toString().split(' ')[4]
        }

        if(info.endStr.indexOf('T')!== -1){
          this.addEvent.end=info.endStr.substr(0,info.endStr.indexOf('T'))+' '+info.end.toString().split(' ')[4]
        }else{
          this.addEvent.end=info.endStr+' '+info.end.toString().split(' ')[4]
        }

        this.scheduleAddDialog=true
    },
    eventClick: function(info) {
//        var start = new Date(info.event.start);
//        var end=new Date(info.event.end);
//        this.clickedEvent.title=info.event.title
//        this.clickedEvent.backgroundColor=info.event.backgroundColor
//        this.clickedEvent.end=end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' ' + (end.getHours()<10?'0'+end.getHours():end.getHours()) + ':' + (end.getMinutes()<10?'0'+end.getMinutes():end.getMinutes()) + ':00' ;
//        this.clickedEvent.id=info.event.id
//        this.clickedEvent.start=start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + ' ' + (start.getHours()<10?'0'+start.getHours():start.getHours())+ ':' + (start.getMinutes()<10?'0'+start.getMinutes():start.getMinutes()) + ':00' ;
//        this.clickedEvent.description=info.event.extendedProps.description
        console.log("####Click")
        getEventById(info.event.id).then(response =>{
          if(response.data.data.start.split(" ").length==1){
            response.data.data.start=response.data.data.start+" 00:00"
            response.data.data.end=response.data.data.end+" 00:00"
          }
          Object.assign(this.clickedEvent,response.data.data)
        })
        console.log(this.clickedEvent.start)
        this.showEvent=true
//        alert('Event: ' + info.event.title);
        //console.log(info.event.description)
//      alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
//      alert('View: ' + info.view.type);

    }
  },
}



</script>

<style lang="scss" scope>
@import '@fullcalendar/core/main.css';
@import '@fullcalendar/daygrid/main.css';
@import '@fullcalendar/timegrid/main.css';

h2 {
  font-size: 15px !important;
}
</style>

