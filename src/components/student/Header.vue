<template>
  <div class="main_part">
    <el-image
        class="logo"
        :src="logoSrc"/>
    <div class="right_part">
      <el-badge :value="messageNum" class="item">
        <el-icon size="30">
          <ChatDotRound/>
        </el-icon>
      </el-badge>
      <span>欢迎，{{ username }}</span>
      <div class="avatar">
        <el-avatar :size="30" :src="studentImg" @click="drawer = true"/>
      </div>
    </div>
  </div>
  <el-drawer v-model="drawer" :with-header="false">
    <el-menu class="drawer_main_part">
      <el-menu-item style="color: black" @click="this.dialogVisible=true">
        <el-icon>
          <Edit/>
        </el-icon>
        <span>修改密码</span>
      </el-menu-item>
    </el-menu>
    <el-menu class="drawer_foot_part">
      <el-menu-item style="color: black" @click="exit()">
        <el-icon>
          <CircleClose/>
        </el-icon>
        <span>退出登录</span>
      </el-menu-item>
    </el-menu>
  </el-drawer>

  <el-dialog
      v-model="dialogVisible"
      title="修改密码"
      width="400px"
      @open="cleanUserPassword()"
      @keyup.enter="judgePwd()"
  >
    <label class="password_label" for="oldP">旧密码</label>
    <el-input show-password id="oldP" v-model="user.oldPassword" style="width: 200px;"/>
    <label class="password_label" for="newP">新密码</label>
    <el-input show-password id="newP" v-model="user.newPassword" style="width: 200px;"/>
    <label class="password_label" for="confirmP">确认密码</label>
    <el-input show-password id="confirmP" v-model="user.confirmPassword" style="width: 200px;"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="judgePwd()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import {ElMessage} from "element-plus";
import {judgePassword, updatePassword} from "@/api/student";

export default {
  name: "Header",
  mounted() {
    this.username = sessionStorage.getItem("username")
  },
  data() {
    return {
      logoSrc: require("@/assets/images/LOGO.png"),
      username: "",
      studentImg: require("@/assets/images/student.jpeg"),
      drawer: false,
      messageNum: "",
      dialogVisible: false,
      user: {
        oldPassword: "",
        confirmPassword: "",
        newPassword: "",
      }
    }
  },
  methods: {
    // 清空密码输入框
    cleanUserPassword() {
      this.user.oldPassword = this.user.confirmPassword = this.user.newPassword = ''
    },
    // 修改密码
    judgePwd() {
      // 分别判断是否为空
      if (this.user.oldPassword === '') {
        ElMessage({
          message: '旧密码不能为空',
          showClose: true,
          grouping: true,
          type: 'warning'
        })
      } else {
        // TODO 判断旧密码是否正确
        judgePassword(this.user.oldPassword)
            .then(resp => {
              if (resp.code === 200) {
                // 密码正确 进行修改密码
                this.changePwd()
              } else {
                // 密码错误
                ElMessage({
                  message: '旧密码错误',
                  showClose: true,
                  grouping: true,
                  type: 'error',
                })
              }
            })
      }
    },
    // 修改密码
    changePwd() {
      if (this.user.newPassword === '') {
        ElMessage({
          message: '新密码不能为空',
          showClose: true,
          grouping: true,
          type: 'warning'
        })
      } else if (this.user.confirmPassword === '') {
        ElMessage({
          message: '请再次输入新密码',
          showClose: true,
          grouping: true,
          type: 'warning'
        })
      } else if (this.user.confirmPassword !== this.user.newPassword) {
        // 判断两次输入是否相同
        ElMessage({
          message: '请输入相同的新密码',
          showClose: true,
          grouping: true,
          type: 'warning'
        })
      } else if (this.user.newPassword.length > 32 || this.user.newPassword.length < 6) {
        ElMessage({
          message: "密码长度应为 6~32 位",
          showClose: true,
          grouping: true,
          type: "warning",
        })
      } else {
        // TODO 修改密码
        updatePassword(this.user.newPassword)
            .then(resp => {
              console.log(resp)
              if (resp.code === 200) {
                alert("密码修改成功，请重新登录")
                // TODO 清除数据 返回登录界面 session token
                sessionStorage.clear()
                window.location.href = "/"
              } else {
                ElMessage({
                  message: "密码修改失败",
                  showClose: true,
                  grouping: true,
                  type: "error"
                })
              }
            })
      }
    },
    // 退出登录
    exit() {
      sessionStorage.clear()
      // TODO 清除数据 返回登录界面 session token
      window.location.href = "/"
    }
  }
}
</script>

<style scoped>
.main_part {
  height: 60px;
  width: 100%;
  text-align: left;
  line-height: 60px;
  background-color: purple;
  min-width: 1000px;
}

.main_part .logo {
  height: 60px;
  margin-left: 20px;
}

.main_part .right_part {
  float: right;
  margin-right: 20px;
  font-weight: bold;
  font-size: 18px;
  color: white;
}

.main_part .right_part .item {
  line-height: 1rem;
  margin-right: 20px;
  cursor: pointer;
}

.main_part .right_part .avatar {
  float: right;
  line-height: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  margin-left: 18px;
  cursor: pointer;
}

.drawer_main_part {
  height: 300px;
  text-align: left;
  font-size: 20px;
  margin-top: 60px;
}

.drawer_foot_part {
  float: bottom;
  height: 100px;
}

.password_label {
  display: block;
  text-align: left;
  margin-left: 80px;
  margin-bottom: 5px;
  margin-top: 10px;
}


</style>
