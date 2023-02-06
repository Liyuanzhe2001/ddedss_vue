<template>
  <div class="main_part">
    <div class="search_part">
      <div class="class_name"> {{ showClassName }}</div>
      <el-select
          style="width: 100px"
          v-model="selectClassId"
          size="default"
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
          style="margin-left:10px;width: 50px;height: 30px"
          @click="queryClassAndTeacherList()"
      >
        搜索
      </el-button>
    </div>
    <div class="table_part">
      <div class="left_part">
        <span>班级同学</span>
        <el-table :data="students" height="250" style="width: 300px;font-size: 14px">
          <el-table-column type="index" label="#" width="60"/>
          <el-table-column prop="studentName" label="姓名" width="120"/>
          <el-table-column prop="studentSex" label="性别" width="120">
            <template #default="scope">
              {{ scope.row.studentSex === 0 ? "女" : "男" }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="right_part">
        <span>班级教师</span>
        <el-table :data="teachers" height="250" style="width: 420px;font-size: 14px">
          <el-table-column type="index" label="#" width="60"/>
          <el-table-column prop="teacherName" label="姓名" width="120"/>
          <el-table-column prop="teacherName" label="性别" width="120">
            <template #default="scope">
              {{ scope.row.teacherSex === 0 ? "女" : "男" }}
            </template>
          </el-table-column>
          <el-table-column prop="subjectName" label="科目" width="120"/>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import teacherRequest from "@/utils/teacherRequest";
import {ElMessage} from "element-plus";
import studentRequest from "@/utils/studentRequest";

export default {
  name: "MyClassView",
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
        this.$router.push("/teacher")
        return
      case '2':
        this.$router.push('/professional')
        return
      case 3:
        this.$route.push("/admin")
        return
    }

    teacherRequest
        .get("/instructor/getManagedClass")
        .then(resp => {
          if (resp.code === 200) {
            this.classList = resp.data
            if (this.classList.length !== 0) {
              this.selectClassId = this.classList[0].classId
              this.showClassName = this.classList[0].className
              // 获取学生列表和教师列表
              this.queryClassAndTeacherList()
            }
          } else {
            ElMessage({
              message: "班级获取失败",
              showClose: true,
              grouping: true,
              type: "error"
            })
          }
        })
  },
  data() {
    return {
      selectClassId: '',
      showClassName: '',
      classList: [],
      students: [],
      teachers: [],
    }
  },
  methods: {
    queryClassAndTeacherList() {
      // 显示正在搜索的班级名
      for (let i = 0; i < this.classList.length; i++) {
        let c = this.classList[i]
        if (c.classId === this.selectClassId) {
          this.showClassName = c.className
          break
        }
      }

      // TODO 通过班级id查询班级学生列表
      teacherRequest
          .get(`/student/queryStudentListByClassId/${this.selectClassId}`)
          .then(resp => {
            if (resp.code === 200) {
              this.students = resp.data
            } else {
              ElMessage({
                message: "获取同学信息失败",
                showClose: true,
                grouping: true,
                type: "error",
              })
              return
            }
          })

      // TODO 通过班级id查询班级教师列表
      teacherRequest
          .get(`/teacher/queryTeacherListByClassId/${this.selectClassId}`)
          .then(resp => {
            if (resp.code === 200) {
              this.teachers = resp.data
            } else {
              ElMessage({
                message: "获取教师信息失败",
                showClose: true,
                grouping: true,
                type: "error",
              })
              return
            }
          })
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
  margin: 20px auto 0;
  text-align: left;
  height: 450px;
}

.main_part .search_part {
  padding: 18px;
  margin: 0 10px;
  border-bottom: solid 1px darkgray;
}

.main_part .search_part .class_name {
  display: inline-block;
  font-size: 30px;
  padding-right: 580px;
  text-align: left;
}

.main_part .table_part {

}

.main_part .table_part .left_part {
  float: left;
  margin: 10px 20px 16px 20px;
  padding: 30px;
  border-radius: 10px;
  border: solid 1px darkgray;
}

.main_part .table_part .right_part {
  float: right;
  margin: 10px 20px 16px 20px;
  padding: 30px;
  border-radius: 10px;
  border: solid 1px darkgray;
}

span {
  display: block;
  font-size: 1.3rem;
  padding-bottom: 20px;
}

</style>
