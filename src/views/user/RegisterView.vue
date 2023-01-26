<template>
  <div class="part">
    <!--顶部-->
    <div class="top_part">
      <div class="top_label">
        用户注册
      </div>
    </div>
    <div class="main_part">
      <el-form :model="registerForm" label-width="0px">
        <br>
        <el-form-item>
          <label for="invite">邀请码</label>
          <el-input
              id="invite"
              style="height: 30px;width: 242px;"
              v-model="registerForm.invite"
              prefix-icon="Message"
              placeholder="请输入班级邀请码"
          />
        </el-form-item>
        <el-form-item>
          <label for="number">学号</label>
          <el-input
              id="number"
              style="height: 30px;width: 242px;"
              v-model="registerForm.number"
              prefix-icon="Place"
              placeholder="请输入学号"
          />
        </el-form-item>
        <el-form-item>
          <label for="username">姓名</label>
          <el-input
              id="username"
              style="height: 30px;width: 242px;"
              v-model="registerForm.username"
              prefix-icon="User"
              placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item>
          <label for="password">密码</label>
          <el-input
              id="password"
              style="height: 30px;width: 242px;"
              v-model="registerForm.password"
              prefix-icon="Lock"
              placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <label for="email">邮箱</label>
          <el-input
              id="email"
              style="height: 30px;width: 242px;"
              v-model="registerForm.email"
              prefix-icon="MessageBox"
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

export default {
  name: "RegisterView",
  data() {
    return {
      registerForm: {
        invite: "",
        number: "",
        username: "",
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
          grouping: true,
          type: "warning",
        })
        return
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

    },
    // 提交
    submit() {
      const user = this.registerForm
      if (user.invite === '') {
        ElMessage({
          message: "邀请码不能为空",
          grouping: true,
          type: "warning",
        })
      } else if (user.number === '') {
        ElMessage({
          message: "学号不能为空",
          grouping: true,
          type: "warning",
        })
      } else if (user.username === '') {
        ElMessage({
          message: "用户名不能为空",
          grouping: true,
          type: "warning",
        })
      } else if (user.password === '') {
        ElMessage({
          message: "密码不能为空",
          grouping: true,
          type: "warning",
        })
      } else if (user.email === '') {
        ElMessage({
          message: "邮箱不能为空",
          grouping: true,
          type: "warning",
        })
      } else if (user.code === '') {
        ElMessage({
          message: "验证码不能为空",
          grouping: true,
          type: "warning",
        })
      } else {
        // TODO 提交注册信息
        axios
            .post("/user/register", this.registerForm)
            .then(resp => {
              console.log(resp)
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
  height: 620px;
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
  height: 440px;
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

.part .bottom_part .btn {
  width: 100px;
}

</style>
