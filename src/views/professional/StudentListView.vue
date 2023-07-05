<template>
  <div class="main_part">
    <el-scrollbar class="left_part" height="380">
      <el-menu
          :default-active="active"
          v-for="c in classList"
          v-bind="c"
          style="border-right: none"
          @select="handleSelect"
      >
        <el-menu-item :index="c.classId" @click="selectClass(c)">
          <span
              v-text="c.className"
              style="font-size: 17px"
          />
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
    <div class="right_part">
      <div v-if="classType!==''&&classMajor!==''">
        <el-table :data="classStudents" height="370" class="table_part">
          <el-table-column type="index" label="#" width="60"/>
          <el-table-column prop="studentName" label="姓名" width="60"/>
          <el-table-column prop="studentSex" label="性别" width="60"/>
        </el-table>
        <div class="label_part">
          <span>
            {{ classType === 0 ? '专科' : '本科' }}-{{ classMajor }}
          </span>
        </div>
        <div class="text_part">
          <p>
            总人数：{{ studentNum }}人
          </p>
          <p>
            男：{{ boyNum }}人
          </p>
          <p>
            女：{{ girlNum }}人
          </p>
        </div>
      </div>
      <div v-else class="select_class_tip">
        请选择班级
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {getAllClass, queryStudentListByClassId} from "@/api/professional";

export default {
  name: "StudentListView",
  mounted() {
    // 判断用户身份
    const identity = sessionStorage.getItem("identity")
    switch (identity) {
      case null:
        alert("无账号信息，请重新登录")
        this.$router.push("/")
        return
      case '0':
        this.$router.push('/student')
        return
      case '1':
      case '-1':
        this.$router.push("/teacher")
        return
      case '3':
        this.$route.push("/admin")
        return
    }

    // 获取所有班级
    getAllClass()
        .then(resp => {
          if (resp.code === 200) {
            this.classList = resp.data
          } else {
            ElMessage({
              message: "获取班级列表失败",
              showClose: true,
              grouping: true,
              type: "error"
            })
          }
        })
  },
  data() {
    return {
      active: '',
      classList: [],
      classStudents: [],
      classType: '',
      classMajor: '',
      studentNum: '',
      boyNum: '',
      girlNum: '',
    }
  },
  methods: {
    // 点击高亮
    handleSelect(key, keyPath) {
      this.active = key
    },
    // 选择班级
    selectClass(c) {
      this.classType = c.classType
      this.classMajor = c.major
      // 查询班级学生信息
      queryStudentListByClassId(c.classId)
          .then(resp => {
            if (resp.code === 200) {
              this.classStudents = resp.data
              this.getNumOfBoyAndGirl()
            } else {
              ElMessage({
                message: "获取学生信息失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }
          })
    },
    // 查询班级人数，男性人数，女性人数
    getNumOfBoyAndGirl() {
      this.boyNum = 0
      this.girlNum = 0
      this.classStudents.forEach(student => {
        if (student.studentSex === 0) {
          student.studentSex = '女'
          this.girlNum += 1
        } else {
          student.studentSex = '男'
          this.boyNum += 1
        }
      })
      this.studentNum = this.classStudents.length

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
  width: 840px;
  margin: 20px auto 0;
  text-align: left;
  height: 450px;
}

.main_part .left_part {
  float: left;
  width: 140px;
  height: 370px;
  margin: 20px;
  padding: 20px;
  border: solid 1px darkgray;
  border-radius: 10px;
}

.main_part .right_part {
  float: right;
  width: 530px;
  height: 370px;
  margin: 20px;
  padding: 20px;
  border: solid 1px darkgray;
  border-radius: 10px;
}

.main_part .right_part .table_part {
  float: left;
  width: 180px;
  font-size: 14px;
}

.main_part .right_part .label_part {
  display: inline-block;
  float: top;
  width: 300px;
  margin-left: 30px;
  height: 100px;
}

.main_part .right_part .label_part span {
  font-size: 40px;
  padding: 0 20px;
  border-bottom: solid 1px darkgray;
}

.main_part .right_part .text_part {
  display: inline-block;
  clear: both;
  width: 300px;
  margin-left: 30px;
  height: 200px;
}

.main_part .right_part .text_part p {
  font-size: 25px;
  line-height: 40px;
}

.main_part .right_part .select_class_tip {
  width: 530px;
  height: 370px;
  line-height: 370px;
  text-align: center;
  font-size: 60px;
}

</style>
