BetterDay
===========================
### 项目介绍
---
此为前端项目地址，后台项目地址：https://github.com/LJP-Perfect/betterday

BetterDay项目是以H5形式展示的一款实用性记录管理应用，目前BetterDay包含三大功能：习惯打卡、日程安排、团队管理。

该项目是我Web课程的课程设计,时间不是很多,且自己技术有限,项目中肯定存在很多问题和BUG,但是做了之后自己很想把这个项目做好做全,后续也会不断更新。

:smile:有问题交流或者建议可以联系邮箱:`13106058519@163.com`或者QQ:`871560465`



#### 项目演示
-----------
- http://47.101.163.255:8080
- 优化做的不是很好，所以首屏加载会有点慢（大约10秒左右）
- 测试账号：freelee 密码：1234（也可以自行注册一个账号）

>项目部分截图

<div style="text-align: center">
<img width="300px" src="https://freelee-betterday.oss-cn-beijing.aliyuncs.com/img/IMG_2257.PNG" />
<img width="300px" style="margin-left: 50px;" src="https://freelee-betterday.oss-cn-beijing.aliyuncs.com/img/IMG_2258.PNG" />
</div>

<div style="text-align: center;margin-top: 50px;">
<img width="300px" src="https://freelee-betterday.oss-cn-beijing.aliyuncs.com/img/IMG_2259.PNG" />
<img width="300px" style="margin-left: 50px;" src="https://freelee-betterday.oss-cn-beijing.aliyuncs.com/img/IMG_2262.PNG" />
</div>


#### 项目技术
-----------
##### 后端
- Spring Boot 2.0.4.RELEASE
- JWT+SpringSecurity鉴权
- Quartz
- Mybatis1.3.2
- AliyunOSS

##### 前端
- vue2
- vuex
- vue-router
- vuetify
- element-ui
- axios
- fullcalendar

### 部署启动
-----------
> 后台
1. 克隆源码到本地，使用IDEA或eclipse打开
2. 数据库新建betterday数据库,导入resources/better.sql文件
3. 修改配置中的数据库配置和`util`包下的`AliyunOSSClientUtil`相关配置
4. 启动项目即可

> 前端
1. 克隆源码到本地
2. 修改config/index.js和src/util/require.js相关Host和Port配置
3. npm install、npm run dev启动即可

### TODO
-----------
- [ ] 习惯管理
    - [x] 习惯打卡
    - [x] 习惯创建
    - [x] 打卡数据查看
    - [ ] 添加更多Icon和系统习惯
    - [ ] 每日习惯打卡时间轴
    - [ ] 打卡邮件提醒 
- [ ] 日程管理
    - [x] 日程增删改查
    - [x] 日程拖拽、拉缩
    - [ ] 今日日程表格
    - [ ] 日程多色显示
    - [ ] 日程邮件提醒
- [ ] 团队管理
    - [x] 团队创建和加入
    - [x] 个人状态修改
    - [x] 踢出成员
    - [ ] 退出团队
    - [ ] 解散团队
    - [ ] 团队成员行程交叉显示
- [ ] 个人管理
    - [x] 密码修改
    - [x] 登出
    - [ ] 个人信息修改
    - [ ] 团队通知
    - [ ] 意见反馈
    - [ ] 系统公告
    - [ ] 系统设置
- [ ] 后台管理系统(暂无) 


### 参考资料
-----------
- [Vuetify文档](https://vuetifyjs.com/zh-Hans/)
- [fullcalendar文档](calendar.io/docs)
- [使用JWT保护你的Spring Boot应用 - Spring Security实战](https://www.jianshu.com/p/b51487766549)
- [Quartz中文文档](https://www.w3cschool.cn/quartz_doc/)
- ......



