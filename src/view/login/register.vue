<template>
  <div id="register">

      <v-content>
        <v-container fluid register-fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>注册</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <v-btn icon large @click="toLogin" target="_blank" v-on="on">
                        <v-icon large>mdi-login-variant</v-icon>
                      </v-btn>
                    </template>
                    <span>登录</span>
                  </v-tooltip>
                </v-toolbar>
                <v-stepper v-model="e1">
                  <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="e1 > 3" step="3">Name of step 3</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step step="4">Name of step 4</v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content step="1">
                      <v-card>
                        <v-card-text>
                          <v-form>
                            <v-text-field prepend-icon="person" name="login" label="用户名" v-model="user.name" type="text"></v-text-field>
                            <v-text-field id="email" prepend-icon="email" name="email" label="邮箱" v-model="user.email" type="text"></v-text-field>
                            <v-text-field id="contact" prepend-icon="phone" name="phone" label="联系方式" v-model="user.phone" type="text"></v-text-field>
                          </v-form>
                        </v-card-text>
                      </v-card>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          @click="e1 = 2"
                        >
                          Continue
                        </v-btn>
                      </v-card-actions>



                    </v-stepper-content>

                    <v-stepper-content step="2">
                      <v-card>
                        <v-card-text>
                          <v-form>
                            <v-text-field id="realname" prepend-icon="assignment_ind" name="realname" label="真实姓名(可选)" v-model="user.realname" type="text"></v-text-field>
                            <v-radio-group v-model="sexStr" row>
                              <v-radio label="女" value="0"></v-radio>
                              <v-radio label="男" value="1"></v-radio>
                            </v-radio-group>
                          </v-form>
                        </v-card-text>
                      </v-card>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="e1= 1">Pre</v-btn>
                        <v-btn
                          color="primary"
                          @click="e1 = 3"
                        >
                          Continue
                        </v-btn>
                      </v-card-actions>


                    </v-stepper-content>

                    <v-stepper-content step="3">
                      <v-card>
                        <v-card-text>
                          <v-form>
                            <v-text-field id="password" prepend-icon="lock" name="password" label="密码" v-model="user.password" type="password"></v-text-field>
                            <v-text-field id="confirmPassword" prepend-icon="lock" name="confirmPassword" label="确认密码" v-model="confirmPassword" type="password"></v-text-field>
                          </v-form>
                        </v-card-text>
                      </v-card>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="e1= 2">Pre</v-btn>
                        <v-btn
                          color="primary"
                          @click="e1 = 4"
                        >
                          Continue
                        </v-btn>
                      </v-card-actions>


                    </v-stepper-content>

                    <v-stepper-content step="4">
                      <v-card>
                        <el-upload
                          class="avatar-uploader"
                          action="/api/user/avatar"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar">
                          <i v-else class="el-icon-plus
                          avatar-uploader-icon"></i>
                        </el-upload>

                      </v-card>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="e1= 3">Pre</v-btn>
                        <v-btn
                          color="primary"
                          @click="register"
                        >
                          Register
                        </v-btn>
                      </v-card-actions>


                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
  </div>
</template>

<script>
  import {register} from '@/api/user'
  export default {
    data: () => ({
      drawer: null,
      e1: 0,
      imageUrl: '',
      sexStr: '0',
      row: null,
      user: {
        name: '',
        password: '',
        email: '',
        phone: '',
        avatar: '',
        sex: 0,
        realname: ''
      },
      confirmPassword: ''

    }),
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.user.avatar=res.data
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      toLogin: function () {
        this.$router.push("/login")
      },
      register: function () {
        if(this.user.username=='' || this.user.password=='' || this.user.email=='' || this.user.phone=='' ){
          this.$toasted.show("注册失败，信息填写不完整", {
            theme: "outline",
            position: "top-center",
            duration : 3000
          })
        }else if(this.confirmPassword!==this.user.password){
            this.$toasted.show("注册失败，两次密码不一致", {
              theme: "outline",
              position: "top-center",
              duration : 3000
            })
        }else{
          this.user.sex=parseInt(this.sexStr)
          register(this.user).then(response => {
            if(response.data.code==200){
              this.$toasted.show("注册成功", {
                theme: "outline",
                position: "top-center",
                duration : 2000
              })
              this.$router.push("/login")
            }else{
              this.$toasted.show(response.data.message, {
                theme: "outline",
                position: "top-center",
                duration : 3000
              })
            }
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
  .avatar-uploader{
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
#register{
  width: 100%;
  height: 100%;
  background-image: url("../../assets/login_bg.jpg");
  background-size: 100% 100%;

}
.container.register-fill-height{
  margin-top: 20%;
}
</style>
