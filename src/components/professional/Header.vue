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
        <el-avatar :size="30" :src="teacherImg" @click="drawer = true"/>
      </div>
    </div>
  </div>
  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <el-menu class="drawer_main_part">
      <el-menu-item style="color: black" @click="changePwdVisible=true">
        <el-icon>
          <Edit/>
        </el-icon>
        <span>修改密码</span>
      </el-menu-item>
      <el-menu-item style="color: black" @click="evaluateVisible=true">
        <el-icon>
          <SetUp/>
        </el-icon>
        <span>开始课程评价</span>
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
      v-model="changePwdVisible"
      title="修改密码"
      width="400px"
      @open="cleanUserPassword()"
      @keyup.enter="changePwd()"
  >
    <label class="password_label" for="oldP">旧密码</label>
    <el-input id="oldP" v-model="user.oldPassword" style="width: 200px;"/>
    <label class="password_label" for="newP">新密码</label>
    <el-input id="newP" v-model="user.newPassword" style="width: 200px;"/>
    <label class="password_label" for="confirmP">确认密码</label>
    <el-input id="confirmP" v-model="user.confirmPassword" style="width: 200px;"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changePwdVisible = false">取消</el-button>
        <el-button type="primary" @click="changePwd()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
      v-model="evaluateVisible"
      title="预定课程评价"
      width="400px"
      @open="cleanEvaluateTime()"
      @keyup.enter="changePwd()"
  >
    <el-date-picker
        v-model="inputTime"
        type="daterange"
        range-separator="To"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        size="default"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="evaluateVisible = false">取消</el-button>
        <el-button type="primary" @click="startEvaluate()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import {ElMessage} from "element-plus";
import request from "@/utils/request";

export default {
  name: "Header",
  data() {
    return {
      logoSrc: require("@/assets/images/LOGO.png"),
      username: "张三",
      teacherImg: require("@/assets/images/teacher.jpeg"),
      drawer: false,
      messageNum: "",

      changePwdVisible: false,
      user: {
        id: 1,
        oldPassword: "",
        confirmPassword: "",
        newPassword: "",
      },

      evaluateVisible: false,
      inputTime: '',
      time: {
        start: "",
        end: "",
      }
    }
  },
  methods: {
    cleanUserPassword() {
      this.user.oldPassword = this.user.confirmPassword = this.user.newPassword = ''
    },
    // 修改密码
    changePwd() {
      // 分别判断是否为空
      if (this.user.oldPassword === '') {
        ElMessage({
          message: '旧密码不能为空',
          type: 'warning',
        })
      } else if (this.user.newPassword === '') {
        ElMessage({
          message: '新密码不能为空',
          type: 'warning',
        })
      } else if (this.user.confirmPassword === '') {
        ElMessage({
          message: '请再次输入新密码',
          type: 'warning',
        })
      } else {
        // 判断旧密码是否正确
        if (this.user.oldPassword !== "1234") {
          ElMessage({
            message: '旧密码错误',
            type: 'warning',
          })
        } else if (this.user.confirmPassword !== this.user.newPassword) {
          // 判断两次输入是否相同
          ElMessage({
            message: '请输入相同的新密码',
            type: 'warning',
          })
        } else {
          // TODO 修改密码
          request
              .put("/user/update_password", {
                "password": this.user.newPassword
              })
              .then(resp => {
                alert("修改成功，请重新登录")
                // TODO 清除数据 返回登录界面 session token
                window.location.href = "/"
              })
        }
      }
    },
    // 打开课程评价设置窗口
    // 清空输入时间框
    cleanEvaluateTime() {
      this.time.start = ''
      this.time.end = ''
    },
    // 提交，开始评估
    startEvaluate() {
      this.time.start = this.inputTime[0]
      this.time.end = this.inputTime[1]
      ElMessage({
        message: "预定评估成功",
        type: "success"
      })
      this.evaluateVisible = false
    },
    // 退出登录
    exit() {
      // 清除用户信息
      // ...
      // 返回登录界面
      window.location.href = "/login"
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
