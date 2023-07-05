<template>
  <el-scrollbar class="main_part">
    <div class="label_part">
      {{ className }}
    </div>
    <div class="left_part">
      <span>班级同学</span>
      <el-table :data="students" height="250" style="width: 100%;font-size: 14px">
        <el-table-column type="index" label="#" min-width="30"/>
        <el-table-column prop="studentName" label="姓名" min-width="50"/>
        <el-table-column prop="studentSex" label="性别" min-width="50">
          <template #default="scope">
            {{ scope.row.studentSex === 0 ? "女" : "男" }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="right_part">
      <span>班级教师</span>
      <el-table :data="teachers" height="250" style="width: 100%;font-size: 14px">
        <el-table-column type="index" label="#" min-width="30"/>
        <el-table-column prop="teacherName" label="姓名" min-width="50"/>
        <el-table-column prop="teacherName" label="性别" min-width="50">
          <template #default="scope">
            {{ scope.row.teacherSex === 0 ? "女" : "男" }}
          </template>
        </el-table-column>
        <el-table-column prop="subjectName" label="科目" min-width="50"/>
      </el-table>
    </div>
  </el-scrollbar>
</template>

<script>
import {ElMessage} from "element-plus";
import {queryClassName, queryTeacherListByClassId} from "@/api/student";
import {queryStudentListByClassId} from "@/api/teacher";

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
      case '3':
        this.$route.push("/admin")
        return
    }

    // TODO 查询用户的班级
    queryClassName()
        .then(resp => {
          if (resp.code === 200) {
            this.classId = resp.data.classId
            this.className = resp.data.className

            // TODO 查询班级人列表
            queryStudentListByClassId(this.classId)
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

            // TODO 查询班级教师
            queryTeacherListByClassId(this.classId)
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
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  width: 840px;
  margin: 20px auto 0;
  height: 450px;
}

.main_part .label_part {
  width: 150px;
  padding: 20px 0 10px;
  margin-left: 60px;
  text-align: center;
  font-size: 1.7rem;
  border-bottom: solid 1px gray;
}

.main_part .left_part {
  width: 30%;
  display: inline-block;
  margin: 10px 20px 0 20px;
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
  display: inline-block;
  width: 40%;
  margin: 10px 0 0 20px;
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
