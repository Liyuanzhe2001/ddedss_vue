<template>
  <div class="login_form" v-loading="loading">
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
        <el-form :model="user" label-width="0px" class="login_main" @keyup.enter="submit">
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
import userRequest from "@/utils/userRequest";

export default {
  name: "LoginView",
  components: {ValidCode},
  mounted() {
    const identity = sessionStorage.getItem("identity")
    switch (identity) {
      case '0':
        this.$router.push('/student')
        return
      case '1':
      case '-1':
        this.$router.push("/teacher")
        return
      case '2':
        this.$router.push("/professional")
        return;
      case '3':
        this.$route.push("/admin")
        return
    }
  },
  data() {
    return {
      loading: false,
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
    // 注册
    register() {
      window.open("/register")
    },
    // 忘记密码
    forgetPwd() {
      window.open("/forget_pwd")
    },
    // 创建验证码
    createValidCode(data) {
      this.validCode = data.toLowerCase()
    },
    // 登录提交
    submit() {
      const user = this.user
      if (user.number === '') {
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
      } else if (user.code === '') {
        if (user.invite === '') {
          ElMessage({
            message: "验证码不能为空",
            showClose: true,
            grouping: true,
            type: "warning",
          })
        }
      } else if (user.code.toLowerCase() !== this.validCode) {
        this.$refs.ValidCode.refreshCode()
        ElMessage({
          message: "验证码错误",
          showClose: true,
          grouping: true,
          type: "warning",
        })
        this.user.code = ''
      } else {
        this.loading = true
        const form = new FormData();
        form.append("number", this.user.number)
        form.append("password", this.user.password)
        userRequest
            .post("/user/login", form)
            .then(resp => {
              if (resp.code === 200) {
                ElMessage({
                  message: "登录成功",
                  showClose: true,
                  grouping: true,
                  type: "success",
                })
                const user = resp.data
                sessionStorage.setItem("username", user.username)
                sessionStorage.setItem("identity", user.identity)
                sessionStorage.setItem("token", user.token)
                switch (user.identity) {
                  case 0:
                    this.$router.push("/student")
                    break
                  case 1:
                  case -1:
                    this.$router.push("/teacher")
                    break
                  case 2:
                    this.$router.push("/professional")
                    break
                  case 3:
                    this.$router.push("/admin")
                    break
                }
              } else {
                ElMessage({
                  message: "用户名或密码错误",
                  showClose: true,
                  grouping: true,
                  type: "warning",
                })
                this.loading = false
                this.$refs.ValidCode.refreshCode()
              }
            })

      }
    }
  }
}
</script>

<style scoped>
.login_form {
  margin: 80px auto;
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
