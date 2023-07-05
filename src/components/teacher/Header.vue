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
  <el-drawer v-model="drawer" :with-header="false">
    <el-menu class="drawer_main_part">
      <el-menu-item style="color: black" @click="this.addSubjectVisible=true">
        <el-icon>
          <Edit/>
        </el-icon>
        <span>新增擅长科目</span>
      </el-menu-item>
      <el-menu-item style="color: black" @click="this.changePwdVisible=true">
        <el-icon>
          <Edit/>
        </el-icon>
        <span>修改密码</span>
      </el-menu-item>
      <el-menu-item v-if="userIdentity==='-1'" style="color: black" @click="this.codeVisible=true">
        <el-icon>
          <Key/>
        </el-icon>
        <span>创建注册码</span>
      </el-menu-item>
    </el-menu>
    <el-menu class="drawer_foot_part">
      <el-menu-item style="color: black" @click="exit">
        <el-icon>
          <CircleClose/>
        </el-icon>
        <span>退出登录</span>
      </el-menu-item>
    </el-menu>
  </el-drawer>

  <el-dialog v-model="addSubjectVisible" title="新增科目">
    <div class="level_div">
      <label>了解</label>
      <el-tag
          style="margin-right: 5px"
          v-for="tag in subjectLevel"
          :key="tag"
          closable
          type="success"
          v-show="tag.level===0"
          :disable-transitions="false"
          @close="subjectClose(tag)"
      >
        {{ tag.subjectName }}
      </el-tag>
      <el-input
          v-if="knowInputVisible"
          ref="InputRef"
          v-model="inputValue"
          style="width: 60px;height: 20px;margin-right: 5px;"
          size="small"
          @blur="subjectAdd(0)"
      />
      <el-button
          v-else
          style="margin-right: 5px;height: 20px;width: 60px"
          size="small"
          @click="this.knowInputVisible = true;this.skilledInputVisible = false;this.masterInputVisible = false;">
        +
      </el-button>
    </div>

    <div class="level_div">
      <label>熟练</label>
      <el-tag
          style="margin-right: 5px"
          v-for="tag in subjectLevel"
          :key="tag"
          closable
          type="warning"
          v-show="tag.level===1"
          :disable-transitions="false"
          @close="subjectClose(tag)"
      >
        {{ tag.subjectName }}
      </el-tag>
      <el-input
          v-if="skilledInputVisible"
          ref="InputRef"
          v-model="inputValue"
          style="width: 60px;height: 20px;margin-right: 5px;"
          size="small"
          @blur="subjectAdd(1)"
      />
      <el-button
          v-else
          style="margin-right: 5px;height: 20px;width: 60px"
          size="small"
          @click="this.knowInputVisible = false;this.skilledInputVisible = true;this.masterInputVisible = false;">
        +
      </el-button>
    </div>

    <div class="level_div">
      <label>精通</label>
      <el-tag
          style="margin-right: 5px"
          v-for="tag in subjectLevel"
          :key="tag"
          closable
          type="danger"
          v-show="tag.level===2"
          :disable-transitions="false"
          @close="subjectClose(tag)"
      >
        {{ tag.subjectName }}
      </el-tag>
      <el-input
          v-if="masterInputVisible"
          ref="InputRef"
          v-model="inputValue"
          style="width: 60px;height: 20px;margin-right: 5px;"
          size="small"
          @blur="subjectAdd(2)"
      />
      <el-button
          v-else
          style="margin-right: 5px;height: 20px;width: 60px"
          size="small"
          @click="this.knowInputVisible = false;this.skilledInputVisible = false;this.masterInputVisible = true;">
        +
      </el-button>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelChangeSubject()">取消</el-button>
        <el-button type="primary" @click="saveChangeSubject()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
      v-model="changePwdVisible"
      title="修改密码"
      width="400px"
      @open="cleanUserPassword()"
      @keyup.enter="judgePwd()"
  >
    <label class="password_label" for="oldP">旧密码</label>
    <el-input id="oldP" v-model="user.oldPassword" show-password type="password" style="width: 200px;"/>
    <label class="password_label" for="newP">新密码</label>
    <el-input id="newP" v-model="user.newPassword" show-password type="password" style="width: 200px;"/>
    <label class="password_label" for="confirmP">确认密码</label>
    <el-input id="confirmP" v-model="user.confirmPassword" show-password type="password" style="width: 200px;"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changePwdVisible = false">取消</el-button>
        <el-button type="primary" @click="judgePwd()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
      v-model="codeVisible"
      title="创建注册码"
      width="400px"
      @close="closeCode"
  >
    <el-select
        style="width: 100px"
        v-model="selectClassId"
    >
      <el-option
          v-for="item in classList"
          :key="item.classId"
          :label="item.className"
          :value="item.classId"
      />
    </el-select>
    <el-button
        type="primary"
        style="margin-left:10px;width: 50px;height: 20px"
        @click="createCode()"
    >
      确定
    </el-button>
    <div id="displayCode" style="display: none">
      <div style="margin: 10px 0">
        注册码还有{{ code.day }}天{{ code.hour }}时过期 <br>
      </div>
      <div>
        {{ code.invite }}
      </div>
    </div>
  </el-dialog>

</template>

<script>
import {ElMessage} from "element-plus";
import {
  createInvite,
  getManagedClass,
  judgePassword,
  modifyTeacherSubjectLevel,
  queryTeacherSubjectLevel,
  updatePassword
} from "@/api/teacher";

export default {
  subjectName: "Header",
  mounted() {
    // TODO 在session获取查询名字
    this.username = sessionStorage.getItem("username")

    // 加载擅长科目
    this.loadLevel()

    // 判断辅导员身份
    this.userIdentity = sessionStorage.getItem("identity");
    // 如果是辅导员，加载管理的班级
    if (this.userIdentity === "-1") {
      // 获取辅导员管理的班级
      getManagedClass
          .then(resp => {
            if (resp.code === 200) {
              this.classList = resp.data
              this.selectClassId = this.classList[0].classId
            } else {
              ElMessage({
                message: "获取班级信息失败",
                showClose: true,
                grouping: true,
                type: "error",
              })
            }
          })
    }
  },
  data() {
    return {
      logoSrc: require("@/assets/images/LOGO.png"),
      username: "",
      userIdentity: 0,
      teacherImg: require("@/assets/images/teacher.jpeg"),
      drawer: false,
      messageNum: "",

      addSubjectVisible: false,
      subjectLevel: [],
      knowInputVisible: false,
      skilledInputVisible: false,
      masterInputVisible: false,
      inputValue: "",

      changePwdVisible: false,
      user: {
        oldPassword: "",
        confirmPassword: "",
        newPassword: "",
      },

      codeVisible: false,
      selectClassId: '',
      classList: [],
      code: {
        day: '',
        hour: '',
        invite: '',
      }
    }
  },
  methods: {
    // TODO 加载教师特长
    loadLevel() {
      queryTeacherSubjectLevel()
          .then(resp => {
            if (resp.code === 200) {
              this.subjectLevel = resp.data
            } else {
              ElMessage({
                message: "获取教师特长失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }
          })
    },
    // 删除教师特长
    subjectClose(tag) {
      this.subjectLevel = this.subjectLevel.filter(function (item) {
        return item !== tag
      })
    },
    // 增加教师特长
    subjectAdd(n) {
      let input = this.inputValue
      let flag = true
      if (input === '') {
        flag = false
      }
      if (flag) {
        this.subjectLevel.forEach(function (value) {
          if (value.subjectName === input) {
            ElMessage({
              message: "该科目已存在",
              type: "warning",
            })
            flag = false
          }
        })
      }

      if (flag) {
        this.subjectLevel.push({
          subjectName: input,
          level: n
        })
        switch (n) {
          case 0:
            this.knowInputVisible = false
            break
          case 1:
            this.skilledInputVisible = false
            break
          case 2:
            this.masterInputVisible = false
            break
        }
      }
      this.inputValue = ""
    },
    // 如果点击取消，则重新加载教师特长数据
    cancelChangeSubject() {
      this.loadLevel()
      this.addSubjectVisible = false
    },
    // TODO 确定修改教师特长
    saveChangeSubject() {
      modifyTeacherSubjectLevel(this.subjectLevel)
          .then(resp => {
            if (resp.code === 200) {
              ElMessage({
                message: "修改成功",
                showClose: true,
                grouping: true,
                type: "success"
              })
              this.addSubjectVisible = false
            } else {
              ElMessage({
                message: "修改失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }
          })
    },
    // 清空密码输入框
    cleanUserPassword() {
      this.user.oldPassword = this.user.confirmPassword = this.user.newPassword = ''
    },
    // 判断旧密码
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
    // 关闭创建注册码窗口
    closeCode() {
      document.getElementById("displayCode").style.display = "none"
    },
    // 创建注册码
    createCode() {
      // TODO 创建注册码 或 查找注册码
      createInvite(this.selectClassId)
          .then(resp => {
            if (resp.code === 200) {
              this.code = resp.data
              document.getElementById("displayCode").style.display = "block"
            } else {
              ElMessage({
                message: '获取注册码失败',
                showClose: true,
                grouping: true,
                type: 'error'
              })
            }
          })
    },
    // 退出登录
    exit() {
      // TODO 清除数据 返回登录界面 session token
      sessionStorage.clear()
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

label {
  margin-right: 10px;
  padding-bottom: 10px;
}

.level_div {
  text-align: left;
  margin-left: 80px;
  margin-bottom: 20px;
}

.password_label {
  display: block;
  text-align: left;
  margin-left: 80px;
  margin-bottom: 5px;
  margin-top: 10px;
}

</style>
