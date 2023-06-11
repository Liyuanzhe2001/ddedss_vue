<template>
  <div class="part">
    <!--顶部-->
    <div class="top_part">
      <div class="top_label">
        用户注册
      </div>
    </div>
    <div class="main_part">
      <el-form :model="registerForm" label-width="0px" label-position="top">
        <br>
        <el-form-item label="注册码">
          <el-input
              id="invite"
              maxlength="8"
              style="height: 30px;width: 242px;"
              v-model="registerForm.invite"
              prefix-icon="Message"
              placeholder="请输入班级注册码"
          />
        </el-form-item>
        <el-form-item label="学号">
          <el-input
              id="number"
              style="height: 30px;width: 242px;"
              v-model="registerForm.number"
              prefix-icon="Place"
              placeholder="请输入学号"
          />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
              id="username"
              style="height: 30px;width: 242px;"
              v-model="registerForm.username"
              prefix-icon="User"
              placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="registerForm.sex" size="default">
            <el-radio-button label="1">男</el-radio-button>
            <el-radio-button label="0">女</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
              id="password"
              style="height: 30px;width: 242px;"
              v-model="registerForm.password"
              prefix-icon="Lock"
              minlength="6"
              maxlength="32"
              type="password"
              show-password
              placeholder="请输入 6~32 位密码"
          />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
              id="email"
              style="height: 30px;width: 242px;"
              v-model="registerForm.email"
              prefix-icon="MessageBox"
              placeholder="请输入邮箱"
          />
        </el-form-item>
        <el-form-item label="验证码">
          <el-input
              id="code"
              style="height: 30px;width: 110px;"
              maxlength="6"
              v-model="registerForm.code"
              placeholder="请输入验证码"
          />
          <el-button
              @click="getCode()"
              style="width: 80px;margin-left: 40px"
              type="primary"
              size="default"
              :disabled="disableSendBtn"
              v-text="codeText"
              round/>
        </el-form-item>
      </el-form>
    </div>
    <div class="bottom_part">
      <el-button
          class="btn"
          type="primary"
          size="default"
          round
          @click="submit"
      >
        注册账号
      </el-button>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import axios from "axios";
import userRequest from "@/utils/userRequest";

export default {
  name: "RegisterView",
  data() {
    return {
      registerForm: {
        invite: "",
        number: "",
        username: "",
        sex: 1,
        password: "",
        email: "",
        code: "",
      },
      codeText: "发送",
      disableSendBtn: false,

      show: true,
      timer: null, //设置计时器,
      second: ""
    }
  },
  methods: {
    // 发送邮箱倒计时
    getCode() {
      if (this.registerForm.email === '') {
        ElMessage({
          message: "邮箱不能为空",
          showClose: true,
          grouping: true,
          type: "warning",
        })
        return
      } else {
        if (this.registerForm.email.search("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.com)")) {
          ElMessage({
            message: "请输入正确的邮箱地址",
            showClose: true,
            grouping: true,
            type: "warning",
          })
          return
        }
      }
      let TIME_COUNT = 60;
      if (!this.timer) {
        this.second = TIME_COUNT;
        this.disableSendBtn = true;
        this.timer = setInterval(() => {
          this.second--;
          if (this.second > 0 && this.second <= TIME_COUNT) {
            this.codeText = this.second + "s"
          } else {
            this.disableSendBtn = false;
            clearInterval(this.timer);
            this.timer = null;
            this.codeText = "发送";
          }
        }, 1000);
      }
      // TODO 发送验证码
      userRequest
          .post("/user/sendVerificationCode/" + this.registerForm.email)
          .then(resp => {
            if (resp.code !== 200) {
              ElMessage({
                message: "验证码发送失败",
                showClose: true,
                grouping: true,
                type: "warning",
              })
            }
          })
    },
    // 提交
    submit() {
      const user = this.registerForm
      if (user.invite === '') {
        ElMessage({
          message: "邀请码不能为空",
          showClose: true,
          grouping: true,
          type: "warning",
        })
      } else if (user.number === '') {
        ElMessage({
          message: "学号不能为空",
          showClose: true,
          grouping: true,
          type: "warning",
        })
      } else if (user.username === '') {
        ElMessage({
          message: "用户名不能为空",
          showClose: true,
          grouping: true,
          type: "warning",
        })
      } else if (user.password === '') {
        ElMessage({
          message: "密码不能为空",
          showClose: true,
          grouping: true,
          type: "warning",
        })
      } else if (user.password.length > 32 || user.password.length < 6) {
        ElMessage({
          message: "密码长度应为 6~32 位",
          showClose: true,
          grouping: true,
          type: "warning",
        })
      } else if (user.email === '') {
        ElMessage({
          message: "邮箱不能为空",
          showClose: true,
          grouping: true,
          type: "warning",
        })
      } else if (user.code === '') {
        ElMessage({
          message: "验证码不能为空",
          showClose: true,
          grouping: true,
          type: "warning",
        })
      } else {
        // TODO 提交注册信息
        userRequest
            .post("/user/register", this.registerForm)
            .then(resp => {
              if (resp.code === 200) {
                alert("注册成功")
                this.$router.push("/login")
              } else {
                ElMessage({
                  message: "注册失败",
                  showClose: true,
                  grouping: true,
                  type: "warning",
                })
              }
            })
      }
    }
  }
}
</script>

<style scoped>

.part {
  margin: 30px auto;
  width: 360px;
  height: 730px;
  border-radius: 10px;
  background-color: white;
}

.part .top_part {
  width: 360px;
  height: 100px;
  font-size: 17px;
  border-top-left-radius: 10px;
  color: black;
}

.part .top_part .top_label {
  float: left;
  line-height: 50px;
  margin: 30px 40px;
  padding: 0 30px;
  border-bottom: solid 1px gray;
}

.part .main_part {
  width: 320px;
  height: 520px;
  padding-left: 40px;
}

.part .main_part label {
  text-align: left;
  font-size: 14px;
}

.part .bottom_part {
  width: 280px;
  height: 70px;
  padding: 20px 40px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  text-align: left;
}

.part .bottom_part .btn {
  width: 100px;
}

</style>
