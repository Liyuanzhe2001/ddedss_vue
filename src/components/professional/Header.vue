<template>
  <div class="main_part">
    <el-image
        class="logo"
        :src="logoSrc"/>
    <div class="right_part">
      <!--      <el-badge :value="messageNum" class="item">-->
      <!--        <el-icon size="30">-->
      <!--          <ChatDotRound/>-->
      <!--        </el-icon>-->
      <!--      </el-badge>-->
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
        <span>预定课程评价</span>
      </el-menu-item>
      <el-menu-item style="color: black" @click="scoreVisible=true">
        <el-icon>
          <EditPen/>
        </el-icon>
        <span>预定考试评分</span>
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
    <el-input id="oldP" show-password v-model="user.oldPassword" style="width: 200px;"/>
    <label class="password_label" for="newP">新密码</label>
    <el-input id="newP" show-password v-model="user.newPassword" style="width: 200px;"/>
    <label class="password_label" for="confirmP">确认密码</label>
    <el-input id="confirmP" show-password v-model="user.confirmPassword" style="width: 200px;"/>
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
      @open="initEvaluate()"
  >
    <el-date-picker
        v-model="inputEvaluateTime"
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

  <el-dialog
      v-model="scoreVisible"
      title="预定考试评分"
      width="400px"
      @open="initScore()"
  >
    <el-date-picker
        v-model="inputScoreTime"
        type="daterange"
        range-separator="To"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        size="default"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="scoreVisible = false">取消</el-button>
        <el-button type="primary" @click="startScore()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import {ElMessage, ElMessageBox} from "element-plus";
import {
  getEvaluationTime,
  getScoreTime,
  judgePassword,
  setCourseEvaluation,
  setScore,
  updatePassword
} from "@/api/professional";
import {exit} from "@/api/user";

export default {
  name: "Header",
  data() {
    return {
      logoSrc: require("@/assets/images/LOGO.png"),
      username: sessionStorage.getItem("username"),
      teacherImg: require("@/assets/images/teacher.jpeg"),
      drawer: false,
      messageNum: "",

      changePwdVisible: false,
      user: {
        oldPassword: "",
        confirmPassword: "",
        newPassword: "",
      },

      evaluateVisible: false,
      inputEvaluateTime: [],
      evaluateTime: {
        start: "",
        end: "",
      },

      scoreVisible: false,
      inputScoreTime: [],
      scoreTime: {
        start: "",
        end: "",
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
    // 初始化评估时间（如果未设置评估时间，start,end设置为空）
    initEvaluate() {
      getEvaluationTime()
          .then(resp => {
            if (resp.code === 200) {
              this.inputEvaluateTime = [resp.data.start, resp.data.end]
              this.evaluateTime = resp.data
            } else {
              ElMessage({
                message: "获取评价时间失败",
                showClose: true,
                grouping: true,
                type: "error",
              })
            }
          })
    },
    // 提交，设定开始评估和结束时间
    startEvaluate() {
      let now = new Date()
      if (this.evaluateTime.start !== '' || this.evaluateTime.start !== undefined) {
        if (now <= this.evaluateTime.start) {
          ElMessage({
            message: "课程评价已开始，不可取消",
            showClose: true,
            grouping: true,
            type: "error"
          })
          return;
        }
      }

      if (now > this.inputEvaluateTime[0]) {
        ElMessage({
          message: "预定时间不得早于当前时间",
          showClose: true,
          grouping: true,
          type: "warning"
        })
        return
      }

      if (this.evaluateTime.start !== '' || this.evaluateTime.start !== undefined
          || this.evaluateTime.end !== '' || this.evaluateTime.end !== undefined) {
        ElMessageBox.confirm(
            '已存在课程评价时间，是否修改？',
            'Warning',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }
        )
            .then(() => {
              this.evaluateTime.start = this.inputEvaluateTime[0]
              this.evaluateTime.end = this.inputEvaluateTime[1]
              setCourseEvaluation(this.evaluateTime)
                  .then(resp => {
                    if (resp.code === 200) {
                      ElMessage({
                        message: "修改成功",
                        showClose: true,
                        grouping: true,
                        type: "success"
                      })
                      this.evaluateVisible = false
                    } else {
                      ElMessage({
                        message: "修改失败",
                        showClose: true,
                        grouping: true,
                        type: "error"
                      })
                    }
                  })
            })
            .catch(() => {
            })
      } else {
        this.evaluateTime.start = this.inputEvaluateTime[0]
        this.evaluateTime.end = this.inputEvaluateTime[1]
        setCourseEvaluation(this.evaluateTime)
            .then(resp => {
              if (resp.code === 200) {
                ElMessage({
                  message: "预定成功",
                  showClose: true,
                  grouping: true,
                  type: "success"
                })
                this.evaluateVisible = false
              } else {
                ElMessage({
                  message: "预定失败",
                  showClose: true,
                  grouping: true,
                  type: "error"
                })
              }
            })
      }
    },
    // 初始化考试评分时间（如果未设置评估时间，start,end设置为空）
    initScore() {
      getScoreTime()
          .then(resp => {
            if (resp.code === 200) {
              this.inputScoreTime = [resp.data.start, resp.data.end]
              this.scoreTime = resp.data
            } else {
              ElMessage({
                message: "获取考试评分时间失败",
                showClose: true,
                grouping: true,
                type: "error",
              })
            }
          })
    },
    // 提交，设定开始评估和结束时间
    startScore() {
      let now = new Date()
      if (this.scoreTime.start !== '' || this.scoreTime.start !== undefined) {
        if (now <= this.scoreTime.start) {
          ElMessage({
            message: "考试评分已开始，不可取消",
            showClose: true,
            grouping: true,
            type: "error"
          })
          return;
        }
      }

      if (now > this.inputScoreTime[0]) {
        ElMessage({
          message: "预定时间不得早于当前时间",
          showClose: true,
          grouping: true,
          type: "warning"
        })
        return
      }

      if (this.scoreTime.start !== '' || this.scoreTime.start !== undefined
          || this.scoreTime.end !== '' || this.scoreTime.end !== undefined) {
        ElMessageBox.confirm(
            '已存在考试评分时间，是否修改？',
            'Warning',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }
        )
            .then(() => {
              this.scoreTime.start = this.inputScoreTime[0]
              this.scoreTime.end = this.inputScoreTime[1]
              setScore(this.scoreTime)
                  .then(resp => {
                    if (resp.code === 200) {
                      ElMessage({
                        message: "修改成功",
                        showClose: true,
                        grouping: true,
                        type: "success"
                      })
                      this.scoreVisible = false
                    } else {
                      ElMessage({
                        message: "修改失败",
                        showClose: true,
                        grouping: true,
                        type: "error"
                      })
                    }
                  })
            })
            .catch(() => {
            })
      } else {
        this.scoreTime.start = this.inputScoreTime[0]
        this.scoreTime.end = this.inputScoreTime[1]
        setScore(this.scoreTime)
            .then(resp => {
              if (resp.code === 200) {
                ElMessage({
                  message: "预定成功",
                  showClose: true,
                  grouping: true,
                  type: "success"
                })
                this.scoreVisible = false
              } else {
                ElMessage({
                  message: "预定失败",
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
      exit()
          .then(resp => {
            if (resp.code === 200) {
              sessionStorage.clear()
              // TODO 清除数据 返回登录界面 session token
              window.location.href = "/"
            } else {
              ElMessage({
                message: "退出登录失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }

          })
    }
  }
}
</script>

<style scoped>
.main_part {
  height: 60px;
  width: 100%;
  min-width: 1000px;
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
