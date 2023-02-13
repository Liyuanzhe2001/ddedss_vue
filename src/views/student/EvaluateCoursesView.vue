<template>
  <div v-if="haveNotice">
    <div class="main_part" v-loading="loading">
      <el-table :data="teachers" height="370" class="table_part">
        <el-table-column type="index" label="#" width="60"/>
        <el-table-column prop="subjectName" label="课程" width="80"/>
        <el-table-column prop="teacherName" label="教师" width="80"/>
        <el-table-column label="评价" width="120">
          <template #default="scope">
            <el-select
                v-model="scope.row.final_"
                size="default"
                @change="evaluateChange"
            >
              <el-option label="优" value="1"/>
              <el-option label="差" value="0"/>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div style="display:inline-block;">
        <div class="good_bad">
          <p>优：{{ goodNum }}</p>
          <p>差：{{ badNum }}</p>
        </div>
        <el-button
            type="primary"
            class="submit_btn"
            round
            @click="submitEvaluation()"
        >
          提交
        </el-button>
      </div>
    </div>
  </div>
  <div v-else class="no_notice">
    暂无课程需要评价
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import studentRequest from "@/utils/studentRequest";

export default {
  teacherName: "EvaluateCoursesView",
  mounted() {
    // 判断用户身份
    const identity = sessionStorage.getItem("identity")
    switch (identity) {
      case null:
        alert("无账号信息，请重新登录")
        this.$router.push("/")
        return
      case '1':
      case '-1':
        this.$router.push("/teacher")
        return
      case '2':
        this.$router.push('/professional')
        return
      case '3':
        this.$route.push("/admin")
        return
    }

    // TODO 是否有课程需要评价
    studentRequest
        .get("/evaluate/haveEvaluateCourseNotice")
        .then(resp => {
          if (resp.code === 200) {
            this.haveNotice = resp.data.haveOrNot === 1
            if (this.haveNotice === true) {
              // 如果有课程评价通知，获取班级，再通过班级id查询教师课程列表
              this.getClass()
            }
          } else {
            ElMessage({
              message: "课程评价通知获取失败",
              showClose: true,
              grouping: true,
              type: "error"
            })
          }
        })
  },
  data() {
    return {
      haveNotice: true,
      loading: false,
      teachers: [],
      goodNum: 0,
      badNum: 0,
    }
  },
  methods: {
    // 1.获取班级
    getClass() {
      studentRequest
          .get("/student/queryClassName")
          .then(resp => {
            if (resp.code === 200) {
              this.getTeacherSubjectList(resp.data.classId)
            } else {
              ElMessage({
                message: "获取班级信息失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }
          })
    },
    // 2. 通过班级id查询教师课程列表
    getTeacherSubjectList(classId) {
      studentRequest
          .get(`/teacher/queryTeacherListByClassId/${classId}`)
          .then(resp => {
            this.teachers = resp.data
          })
    },
    // 选择评价触发，修改优的数量和差的数量
    evaluateChange() {
      this.goodNum = 0
      this.badNum = 0
      for (let i = 0; i < this.teachers.length; i++) {
        let final_ = this.teachers[i].final_
        if (final_ === "1") {
          this.goodNum++
        } else if (final_ === "0") {
          this.badNum++
        }
      }
    },
    // 提交评价
    submitEvaluation() {
      this.loading = true
      if (this.goodNum + this.badNum === this.teachers.length) {
        // TODO 提交
        var formData = new FormData();
        formData.append("gradeTeachers", this.teachers)
        studentRequest
            .post("/evaluateFinal/gradeTeacher", {
              "gradeTeachers": this.teachers
            })
            .then(resp => {
              if (resp.code === 200) {
                ElMessage({
                  message: "提交成功",
                  showClose: true,
                  grouping: true,
                  type: "success",
                })
              }
              this.haveNotice = 0
            })
        this.haveNotice = false
      } else {
        ElMessage({
          message: "请完成所有评价",
          showClose: true,
          grouping: true,
          type: "warning",
        })
      }
      this.loading = false
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

.main_part .table_part {
  display: inline-block;
  width: 340px;
  margin-top: 40px;
  margin-left: 80px;
}

.main_part .submit_btn {
  width: 180px;
  height: 40px;
  font-size: 17px;
  margin-left: 140px;
  margin-bottom: 100px;
}

.main_part .good_bad {
  margin-left: 120px;
  margin-bottom: 80px;
  font-size: 40px;
  line-height: 70px;
}

.no_notice {
  background-color: darkgray;
  border-radius: 10px;
  padding: 10px;
  width: 940px;
  height: 450px;
  margin: 20px auto 0;
  line-height: 450px;
  font-size: 60px;
  text-align: center;
  cursor: default;
  user-select: none;
}

</style>
