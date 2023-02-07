<template>
  <div class="main_part">
    <el-form
        class="form_part"
        :model="teacherInfo"
        label-width="120px"
        label-position="top"
        size="default"
        @keydown.enter="submit"
    >
      <div class="left_part">
        <el-form-item label="工号">
          <el-input v-model="teacherInfo.number"/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="teacherInfo.name"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="teacherInfo.sex" size="default">
            <el-radio-button label="1">男</el-radio-button>
            <el-radio-button label="0">女</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="teacherInfo.email"/>
        </el-form-item>
      </div>
      <div class="right_part">
        <el-form-item label="擅长科目">
          <div class="level_div">
            <label>了解</label>
            <el-tag
                style="margin-right: 5px"
                v-for="tag in teacherInfo.subjectLevelList"
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
                v-model="levelInputValue"
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
                v-for="tag in teacherInfo.subjectLevelList"
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
                v-model="levelInputValue"
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
                v-for="tag in teacherInfo.subjectLevelList"
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
                v-model="levelInputValue"
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
        </el-form-item>
        <el-button type="primary" round class="btn" @click="submit">创建</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import adminRequest from "@/utils/adminRequest";

export default {
  name: "AddTeacherView",
  mounted() {
    // 判断用户身份
    const identity = sessionStorage.getItem("identity")
    switch (identity) {
      case null:
        alert("无账号信息，请重新登录")
        this.$router.push("/")
        return
      case '0':
        this.$router.push("/student")
        return
      case '1':
      case '-1':
        this.$router.push("/teacher")
        return
      case '2':
        this.$router.push('/professional')
        return
    }
  },
  data() {
    return {
      teacherInfo: {
        number: '',
        name: '',
        email: '',
        sex: '',
        subjectLevelList: []
      },
      knowInputVisible: false,
      skilledInputVisible: false,
      masterInputVisible: false,
      levelInputValue: '',
    }
  },
  methods: {
    // 删除擅长科目
    subjectClose(tag) {
      this.teacherInfo.subjectLevelList = this.teacherInfo.subjectLevelList.filter(function (item) {
        return item !== tag
      })
    },
    // 增加擅长科目
    subjectAdd(n) {
      let input = this.levelInputValue
      if (input === '') {
        this.knowInputVisible = false
        this.skilledInputVisible = false
        this.masterInputVisible = false
      }
      let flag = true
      if (input === '') {
        flag = false
      }
      if (flag) {
        this.teacherInfo.subjectLevelList.forEach(function (value) {
          if (value.subjectName === input) {
            ElMessage({
              message: "该科目已存在",
              showClose: true,
              grouping: true,
              type: "warning",
            })
            flag = false
          }
        })
      }
      if (flag) {
        this.teacherInfo.subjectLevelList.push({
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
      this.levelInputValue = ""
    },
    // 提交
    submit() {
      if (this.teacherInfo.number === '') {
        ElMessage({
          message: "工号不能为空",
          showClose: true,
          grouping: true,
          type: "warning",
        })
      } else if (this.teacherInfo.name === '') {
        ElMessage({
          message: "姓名不能为空",
          showClose: true,
          grouping: true,
          type: "warning",
        })
      } else if (this.teacherInfo.sex === '') {
        ElMessage({
          message: "性别不能为空",
          showClose: true,
          grouping: true,
          type: "warning",
        })
      } else if (this.teacherInfo.email === '') {
        ElMessage({
          message: "邮箱不能为空",
          showClose: true,
          grouping: true,
          type: "warning",
        })
      } else if (this.teacherInfo.email.search("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.com)")) {
        ElMessage({
          message: "邮箱格式错误",
          showClose: true,
          grouping: true,
          type: "warning",
        })
      } else {
        adminRequest
            .post("/admin/addTeacher", this.teacherInfo)
            .then(resp => {
              if (resp.code === 200) {
                ElMessage({
                  message: "新增教师成功",
                  showClose: true,
                  grouping: true,
                  type: "success",
                })
                this.teacherInfo = {
                  number: '',
                  name: '',
                  email: '',
                  sex: '',
                  subjectLevelList: []
                }
              } else {
                ElMessage({
                  message: "新增教师失败",
                  showClose: true,
                  grouping: true,
                  type: "error",
                })
              }
            })
      }
    }
  }
}
</script>

<style scoped>
.main_part {
  display: inline-block;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  width: 940px;
  height: 450px;
  margin: 20px auto 0;
  text-align: left;
}

.main_part .form_part {
  width: 870px;
  margin: 40px auto;
}

.main_part .form_part .left_part {
  width: 400px;
  float: left;
  padding-right: 30px;
  border-right: solid 1px darkgray;
}

.main_part .form_part .right_part {
  width: 400px;
  float: right;
}

.main_part .form_part .right_part label {
  margin-right: 10px;
  padding-bottom: 10px;
}

.level_div {
  width: 100%;
  margin-bottom: 10px;
}

.main_part .form_part .right_part .btn {
  width: 140px;
  height: 40px;
  font-size: 17px;
  margin-top: 80px;
  margin-left: 20px;
}

</style>
