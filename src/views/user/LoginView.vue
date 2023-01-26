<template>
  <div class="login_form">
    <!--登录部分-->
    <div class="login_left">
      <!--头部文字-->
      <div class="login_top">
        <div class="login_top_label">
          用户登录
        </div>
      </div>
      <!--主要部分-->
      <div>
        <el-form :model="user" label-width="0px" class="login_main">
          <br>
          <el-form-item>
            <label for="number">用户名</label>
            <el-input
                id="number"
                style="height: 30px;width: 242px;"
                v-model="user.number"
                prefix-icon="User"
                placeholder="学号/工号"
            />
            <el-icon size="23" title="注册账号" @click="register()">
              <QuestionFilled/>
            </el-icon>
          </el-form-item>
          <el-form-item>
            <label for="password">密码</label>
            <el-input
                id="password"
                style="height: 30px;width: 242px;"
                show-password
                v-model="user.password"
                prefix-icon="Lock"
                placeholder="请输入账户密码"
            />
            <el-icon size="23" title="忘记密码" @click="forgetPwd()">
              <QuestionFilled/>
            </el-icon>
          </el-form-item>
          <el-form-item>
            <label for="code" style="width: 300px;text-align: left">验证码</label>
            <el-input
                id="code"
                style="height: 30px;width: 90px;"
                maxlength="6"
                v-model="user.code"
                placeholder="请输入验证码"
            />
            <ValidCode ref="ValidCode" @input="createValidCode"/>
          </el-form-item>
        </el-form>
      </div>
      <div class="login_foot">
        <div class="l_btn">
          <el-button
              style="width: 100px"
              type="primary"
              size="large"
              round
              @click="submit"
          >
            登录
          </el-button>
        </div>
      </div>
    </div>

    <div class="login_right">
      <el-image style="width: 700px; height: 500px;border-radius: 0 10px 10px 0" :src="pic"/>
    </div>
  </div>
</template>

<script>
import ValidCode from "@/components/ValidCode";
import {ElMessage} from "element-plus";
import axios from "axios";

export default {
  name: "LoginView",
  components: {ValidCode},
  data() {
    return {
      user: {
        number: "",
        password: "",
        code: "",
      },
      validCode: '',
      pic: require("@/assets/images/login_pic.png")
    }
  },
  methods: {
    register() {
      window.open("/register")
    },
    forgetPwd() {
      window.open("/forget_pwd")
    },
    createValidCode(data) {
      this.validCode = data.toLowerCase()
    },
    submit() {
      const user = this.user
      if (user.number === '') {
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
      } else if (user.code === '') {
        if (user.invite === '') {
          ElMessage({
            message: "验证码不能为空",
            grouping: true,
            type: "warning",
          })
        }
      } else if (user.code.toLowerCase() !== this.validCode) {
        this.$refs.ValidCode.refreshCode()
        ElMessage({
          message: "验证码错误",
          grouping: true,
          type: "warning",
        })
        this.user.code = ''
      } else {
        // TODO Login
        const form = new FormData();
        form.append("number", this.user.number)
        form.append("password", this.user.password)
        axios
            .post("/user/login", form)
            .then(resp => {
              console.log(resp)
            })
      }
    }
  }
}
</script>

<style scoped>
.login_form {
  margin: 30px auto;
  border-radius: 10px;
  background-color: white;
  width: 1000px;
}

.login_form .login_left {
  display: inline-block;
  width: 300px;
  border-radius: 10px 0 0 10px;
  height: 500px;
}

.login_form .login_left .login_top {
  width: 300px;
  height: 100px;
  font-size: 17px;
  border-top-left-radius: 10px;
  color: black;
}

.login_form .login_left .login_top .login_top_label {
  float: left;
  line-height: 50px;
  margin: 30px 14px;
  padding: 0 30px;
  border-bottom: solid 1px gray;
}

.login_form .login_left .login_main {
  width: 270px;
  padding: 5px 15px;
}

.login_form .login_left .login_main label {
  font-size: 14px;
  margin-left: 8px;
  margin-bottom: 10px;
}

.login_form .login_left .login_main .el-icon {
  margin-left: 5px;
  display: inline-block;
  cursor: pointer;
}

.login_form .login_left .login_main .code_pic {
  margin-left: 30px;
  font-size: 30px;
  color: white;
  width: 107px;
  height: 30px;
  background-color: black;
}


.login_form .login_left .login_foot {
  width: 300px;
  height: 80px;
  border-bottom-left-radius: 10px;
}

.login_form .login_left .login_foot .l_btn {
  float: left;
  padding: 15px 0 30px 0;
  width: 150px;
  height: 40px;
}

.login_form .login_right {
  display: inline-block;
  float: right;
  width: 700px;
  height: 500px;
  border-radius: 0 10px 10px 0;
  box-shadow: 0 0 10px black;
}
</style>
