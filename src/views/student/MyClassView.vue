<template>
  <el-scrollbar class="main_part">
    <div class="label_part">
      {{ className }}
    </div>
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
  </el-scrollbar>
</template>

<script>
import studentRequest from "@/utils/studentRequest";
import {ElMessage} from "element-plus";

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
      case '1':
      case '-1':
        this.$router.push("/teacher")
        return
      case '2':
        this.$router.push('/professional')
        return
      case 3:
        this.$route.push("/admin")
        return
    }

    // TODO 查询用户的班级
    studentRequest
        .get("/student/queryClassName")
        .then(resp => {
          if (resp.code === 200) {
            this.classId = resp.data.classId
            this.className = resp.data.className

            // TODO 查询班级人列表
            studentRequest
                .get(`/student/queryStudentListByClassId/${this.classId}`)
                .then(resp => {
                  if(resp.code === 200) {
                    this.students = resp.data
                  }else {
                    ElMessage({
                      message: "获取同学信息失败",
                      showClose: true,
                      grouping: true,
                      type: "error",
                    })
                    return
                  }
                })

            // TODO 查询班级教师
            studentRequest
                .get(`/teacher/queryTeacherListByClassId/${this.classId}`)
                .then(resp => {
                  if(resp.code === 200) {
                    this.teachers = resp.data
                  }else{
                    ElMessage({
                      message: "获取教师信息失败",
                      showClose: true,
                      grouping: true,
                      type: "error",
                    })
                    return
                  }
                })

          } else {
            ElMessage({
              message: "获取班级信息失败",
              showClose: true,
              grouping: true,
              type: "error",
            })
            return
          }
        })

  },
  data() {
    return {
      classId: '',
      className: "",
      students: [],
      teachers: [],
    }
  },
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

.main_part .label_part {
  width: 150px;
  padding: 20px 0;
  margin-left: 20px;
  text-align: center;
  font-size: 1.7rem;
  border-bottom: solid 1px gray;
}

.main_part .left_part {
  float: left;
  margin: 10px 20px 16px 20px;
  padding: 30px;
  border-radius: 10px;
  border: solid 1px darkgray;
}

.main_part .left_part span {
  display: block;
  font-size: 1.3rem;
  padding-bottom: 20px;
}

.main_part .right_part {
  float: right;
  margin: 10px 20px 16px 20px;
  padding: 30px;
  border-radius: 10px;
  border: solid 1px darkgray;
}

.main_part .right_part span {
  display: block;
  font-size: 1.3rem;
  padding-bottom: 20px;
}

</style>
