<template>
  <div class="part">
    <!--顶部-->
    <div class="top_part">
      <div class="top_label">
        忘记密码
      </div>
    </div>
    <div class="main_part">
      <el-form :model="registerForm" label-width="0px">
        <br>
        <el-form-item>
          <label for="number">用户名</label>
          <el-input
              id="number"
              style="height: 30px;width: 242px;"
              v-model="registerForm.number"
              prefix-icon="Place"
              placeholder="请输入学号/工号"
          />
        </el-form-item>
        <el-form-item>
          <label for="email">邮箱</label>
          <el-input
              id="email"
              style="height: 30px;width: 242px;"
              v-model="registerForm.email"
              prefix-icon="Message"
              placeholder="请输入邮箱"
          />
        </el-form-item>
        <el-form-item>
          <label for="code">验证码</label>
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
        <el-form-item>
          <label for="newPwd">新密码</label>
          <el-input
              id="newPwd"
              style="height: 30px;width: 242px;"
              v-model="registerForm.password"
              prefix-icon="Lock"
              placeholder="请输入 6~32 位密码"
              type="password"
              minlength="6"
              maxlength="32"
              show-password
          />
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
        忘记密码
      </el-button>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import axios from "axios";
import userRequest from "@/utils/userRequest";

export default {
  name: "ForgetPwdView",
  data() {
    return {
      registerForm: {
        number: "",
        email: "",
        code: "",
        password: "",
      },
      codeText: "发送",
      disableSendBtn: false,

      timer: null, //设置计时器,
      second: "",
    }
  },
  methods: {
    // 发送验证码
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
      }
    },
    // 提交忘记密码
    submit() {
      const user = this.registerForm
      if (user.number === '') {
        ElMessage({
          message: "学号不能为空",
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
      } else if (user.password === '') {
        ElMessage({
          message: "新密码不能为空",
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
      } else {
        // TODO 忘记密码
        userRequest
            .post("/user/forgetPassword", this.registerForm)
            .then(resp => {
              if (resp.code === 200) {
                alert("修改成功")
                this.$router.push("/login")
              } else {
                ElMessage({
                  message: "修改失败",
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
  height: 480px;
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
  height: 300px;
  padding-left: 40px;
}

.part .main_part label {
  width: 320px;
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
</style>
