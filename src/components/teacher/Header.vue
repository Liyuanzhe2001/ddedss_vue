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
      <el-menu-item v-if="userIdentity==='0'" style="color: black" @click="this.codeVisible=true">
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
      v-model="codeVisible"
      title="创建注册码"
      width="400px"
      @open="cleanUserPassword()"
      @keyup.enter="changePwd()"
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
        {{ code.text }}
      </div>
    </div>
  </el-dialog>

</template>

<script>
import {ElMessage} from "element-plus";
import request from "@/utils/request";

export default {
  subjectName: "Header",
  created() {
    // TODO 在session获取查询名字
    this.username = "张三"

    this.loadLevel()
  },
  mounted() {
    this.userIdentity = sessionStorage.getItem("identity");
    this.userIdentity = "0"
    if (this.userIdentity === "0") {

      this.classList = [
        {
          classId: 1,
          className: "B200101",
        },
        {
          classId: 2,
          className: "B200102",
        },
        {
          classId: 3,
          className: "B200103",
        },
        {
          classId: 4,
          className: "B200104",
        },
        {
          classId: 5,
          className: "B200105",
        },
        {
          classId: 6,
          className: "B200106",
        },
      ]

      this.selectClassId = this.classList[0].classId
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
        id: 1,
        oldPassword: "",
        confirmPassword: "",
        newPassword: "",
      },

      codeVisible: false,
      selectClassId: '',
      classList: [],
      code: {
        day: 6,
        hour: 20,
        text: "uwievbwoinapjocpqownwei",
      }
    }
  },
  methods: {
    // TODO 加载教师特长
    loadLevel() {
      request
          .get("/teacher_subject/query_teacher_subject_level")
          .then(resp => {
            console.log(resp)
          })
      this.subjectLevel = [
        {
          subjectName: "Java",
          level: 0,
        },
        {
          subjectName: "C",
          level: 1,
        },
        {
          subjectName: "C++",
          level: 2,
        },
        {
          subjectName: "Rust",
          level: 1,
        },
        {
          subjectName: "Python",
          level: 2,
        },
        {
          subjectName: "Golang",
          level: 2,
        },
      ]
    },
    subjectClose(tag) {
      this.subjectLevel = this.subjectLevel.filter(function (item) {
        return item !== tag
      })
    },
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
      request
          .put("/teacher_subject/modify_teacher_subject_level", this.subjectLevel)
          .then(resp => {
            console.log(resp)
          })
      // 保存到数据库
      this.addSubjectVisible = false
    },
    cleanUserPassword() {
      this.user.oldPassword = this.user.confirmPassword = this.user.newPassword = ''
    },
    // 修改密码
    changePwd() {
      // 分别判断是否为空
      if (this.user.oldPassword === '') {
        ElMessage({
          message: '原密码不能为空',
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
        // TODO 判断旧密码是否正确
        let oldPasswordFlag = false
        request
            .post("/user/judge_password", {
              "password": this.user.oldPassword
            })
            .then(resp => {
              // 密码正确
              // oldPasswordFlag = true
              // 密码错误
              // oldPasswordFlag = false
            })
        if (this.user.confirmPassword !== this.user.newPassword) {
          // 判断两次输入是否相同
          ElMessage({
            message: '请输入相同的新密码',
            type: 'warning',
          })
        } else if (!oldPasswordFlag) {
          ElMessage({
            message: '原密码错误',
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
    // 创建注册码
    createCode() {
      // TODO 创建注册码
      console.log(this.selectClassId)
      document.getElementById("displayCode").style.display = "block"
    },
    // 退出登录
    exit() {
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
